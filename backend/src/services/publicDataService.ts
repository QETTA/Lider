import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { XMLParser } from 'fast-xml-parser';
import { loggers } from '../utils/logger';

const logger = loggers.publicData;
const prisma = new PrismaClient();

const PUBLIC_DATA_BASE_URL = process.env.PUBLIC_DATA_BASE_URL || 'https://apis.data.go.kr';
const API_KEY = process.env.PUBLIC_DATA_API_KEY || '';

// 캐시 유효 시간 (1시간)
const CACHE_TTL_MS = 60 * 60 * 1000;

interface SalaryInfoResult {
  longTermCareId: string;
  salaryInfo: unknown;
  timestamp: string;
  cached?: boolean;
}

interface GradeResult {
  longTermCareId: string;
  evalDate?: string;
  gradeResult: unknown;
  timestamp: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export const publicDataService = {
  // 급여정보 조회 (B500001)
  async getSalaryInfo(longTermCareId: string): Promise<SalaryInfoResult> {
    // 캐시 확인
    const cached = await this.getCachedData<SalaryInfoResult>('salary', longTermCareId);
    if (cached && isRecord(cached)) {
      return {
        longTermCareId: typeof cached.longTermCareId === 'string' ? cached.longTermCareId : longTermCareId,
        salaryInfo: 'salaryInfo' in cached ? cached.salaryInfo : null,
        timestamp: typeof cached.timestamp === 'string' ? cached.timestamp : new Date().toISOString(),
        cached: true,
      };
    }

    try {
      const response = await axios.get(
        `${PUBLIC_DATA_BASE_URL}/B500001/callSalaryInfo`,
        {
          params: {
            serviceKey: API_KEY,
            rcperRcognNo: longTermCareId,
            type: 'xml',
          },
          timeout: 10000,
        }
      );

      // XML 파싱
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
      });
      const parsed = parser.parse(response.data);

      const result: SalaryInfoResult = {
        longTermCareId,
        salaryInfo: parsed.response?.body?.item || null,
        timestamp: new Date().toISOString(),
      };

      // 캐시 저장
      await this.setCachedData('salary', longTermCareId, result);

      return result;
    } catch (err) {
      logger.error({ err, longTermCareId }, 'Public data salary info error');
      throw err;
    }
  },

  // 등급 판정결과 조회 (B500002)
  async getGradeResult(longTermCareId: string, evalDate?: string): Promise<GradeResult> {
    try {
      const response = await axios.get(
        `${PUBLIC_DATA_BASE_URL}/B500001/callGradeResult`,
        {
          params: {
            serviceKey: API_KEY,
            rcperRcognNo: longTermCareId,
            evlDt: evalDate,
            type: 'xml',
          },
          timeout: 10000,
        }
      );

      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
      });
      const parsed = parser.parse(response.data);

      return {
        longTermCareId,
        evalDate,
        gradeResult: parsed.response?.body?.item || null,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      logger.error({ err, longTermCareId }, 'Public data grade result error');
      throw err;
    }
  },

  // 수급자 종합 정보
  async getRecipientSummary(longTermCareId: string) {
    const [salaryInfo, gradeResult, localData] = await Promise.all([
      this.getSalaryInfo(longTermCareId).catch(() => null),
      this.getGradeResult(longTermCareId).catch(() => null),
      prisma.recipient.findUnique({
        where: { longTermCareId },
        include: {
          documents: { orderBy: { createdAt: 'desc' }, take: 3 },
          evaluations: { orderBy: { evalDate: 'desc' }, take: 1 },
          _count: {
            select: { records: true, consultations: true },
          },
        },
      }),
    ]);

    return {
      longTermCareId,
      publicData: {
        salary: salaryInfo?.salaryInfo,
        grade: gradeResult?.gradeResult,
      },
      localData,
      syncStatus: {
        hasLocalData: !!localData,
        hasPublicData: !!(salaryInfo?.salaryInfo || gradeResult?.gradeResult),
        lastSynced: salaryInfo?.timestamp || null,
      },
    };
  },

  // API 상태 확인
  async checkApiStatus() {
    const testId = '1234567890'; // 테스트용 가상 번호
    
    try {
      const startTime = Date.now();
      await axios.get(
        `${PUBLIC_DATA_BASE_URL}/B500001/callSalaryInfo`,
        {
          params: {
            serviceKey: API_KEY,
            rcperRcognNo: testId,
            type: 'xml',
          },
          timeout: 5000,
        }
      );
      
      return {
        status: 'operational',
        responseTime: Date.now() - startTime,
        apiKeyConfigured: !!API_KEY,
      };
    } catch (err) {
      // 404나 500이 오더라도 연결은 된 것
      if ((err as any).response) {
        return {
          status: 'operational',
          apiKeyConfigured: !!API_KEY,
          note: 'Test ID returned expected error',
        };
      }
      
      return {
        status: 'unreachable',
        apiKeyConfigured: !!API_KEY,
        error: (err as Error).message,
      };
    }
  },

  // 캐시 조회
  async getCachedData<T extends object>(apiType: string, cacheKey: string): Promise<T | null> {
    try {
      const cached = await prisma.publicDataCache.findUnique({
        where: { cacheKey: `${apiType}:${cacheKey}` },
      });

      if (cached && new Date(cached.expiresAt) > new Date()) {
        return (isRecord(cached.data) ? cached.data : null) as T | null;
      }

      return null;
    } catch (err) {
      logger.error({ err, apiType, cacheKey }, 'Cache retrieval error');
      return null;
    }
  },

  // 캐시 저장
  async setCachedData(apiType: string, cacheKey: string, data: any) {
    try {
      const expiresAt = new Date(Date.now() + CACHE_TTL_MS);
      
      await prisma.publicDataCache.upsert({
        where: { cacheKey: `${apiType}:${cacheKey}` },
        update: {
          data,
          expiresAt,
        },
        create: {
          apiType,
          cacheKey: `${apiType}:${cacheKey}`,
          data,
          expiresAt,
        },
      });
    } catch (err) {
      logger.error({ err, apiType, cacheKey }, 'Cache storage error');
    }
  },
};
