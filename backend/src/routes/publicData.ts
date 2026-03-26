import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { loggers } from '../utils/logger';
import { publicDataService } from '../services/publicDataService';

const logger = loggers.publicData;

// 급여정보 조회 스키마
const salaryInfoSchema = z.object({
  longTermCareId: z.string().regex(/^\d{10}$/, '수급자번호는 10자리 숫자입니다'),
});

// 등급 판정 결과 조회 스키마
const gradeResultSchema = z.object({
  longTermCareId: z.string().regex(/^\d{10}$/),
  evalDate: z.string().regex(/^\d{8}$/, 'YYYYMMDD 형식이어야 합니다').optional(),
});

export async function publicDataRoutes(fastify: FastifyInstance) {
  // 장기요양 급여정보 조회 (수급자 10자리 번호)
  fastify.get('/salary-info', {
    schema: {
      tags: ['PublicData'],
      summary: '급여정보 조회',
      description: '공공데이터포털 - 노인장기요양보험 급여정보 조회',
    },
  }, async (request, reply) => {
    const query = salaryInfoSchema.parse(request.query);

    try {
      const result = await publicDataService.getSalaryInfo(query.longTermCareId);

      return {
        success: true,
        data: result,
        source: 'public-data-api',
        cached: result.cached || false,
      };
    } catch (err) {
      logger.error({ err, longTermCareId: query.longTermCareId }, 'Salary info fetch failed');
      
      return reply.status(502).send({
        success: false,
        error: {
          code: 'PUBLIC_DATA_ERROR',
          message: '공공데이터 API 호출 중 오류가 발생했습니다',
          details: process.env.NODE_ENV !== 'production' ? (err as Error).message : undefined,
        },
      });
    }
  });

  // 등급 판정결과 조회
  fastify.get('/grade-result', {
    schema: {
      tags: ['PublicData'],
      summary: '등급 판정결과 조회',
      description: '공공데이터포털 - 노인장기요양보험 등급판정결과 조회',
    },
  }, async (request, reply) => {
    const query = gradeResultSchema.parse(request.query);

    try {
      const result = await publicDataService.getGradeResult(
        query.longTermCareId,
        query.evalDate
      );

      return {
        success: true,
        data: result,
        source: 'public-data-api',
      };
    } catch (err) {
      logger.error({ err, longTermCareId: query.longTermCareId }, 'Grade result fetch failed');
      
      return reply.status(502).send({
        success: false,
        error: {
          code: 'PUBLIC_DATA_ERROR',
          message: '등급 조회 중 오류가 발생했습니다',
        },
      });
    }
  });

  // 수급자 종합 정보 (급여 + 등급 + 내부 DB)
  fastify.get('/recipient-summary/:longTermCareId', {
    schema: {
      tags: ['PublicData'],
      summary: '수급자 종합 정보',
      description: '공단 데이터 + 내부 DB 통합 조회',
    },
  }, async (request) => {
    const { longTermCareId } = request.params as { longTermCareId: string };

    const result = await publicDataService.getRecipientSummary(longTermCareId);

    return {
      success: true,
      data: result,
    };
  });

  // API 상태 확인
  fastify.get('/status', {
    schema: {
      tags: ['PublicData'],
      summary: '공공데이터 API 상태',
    },
  }, async () => {
    const status = await publicDataService.checkApiStatus();

    return {
      success: true,
      data: status,
    };
  });
}
