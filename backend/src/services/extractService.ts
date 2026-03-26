import { promises as fs } from 'node:fs';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';
import { loggers } from '../utils/logger';
import { aiService } from './aiService';

const logger = loggers.extract;
const prisma = new PrismaClient();

// 장기요양 필수 문서 체크리스트
const REQUIRED_DOCUMENTS = {
  CONTRACT_RENEWAL: ['EVAL_FORM', 'DOCTOR_NOTE', 'CONTRACT'],
  NEW_APPLICATION: ['EVAL_FORM', 'DOCTOR_NOTE'],
  GRADE_CHANGE: ['EVAL_FORM', 'DIAGNOSIS'],
};

function resolveUploadDirectory() {
  return process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'uploads');
}

function resolveStoredDocumentPath(fileUrl: string) {
  if (/^https?:\/\//i.test(fileUrl)) {
    return null;
  }

  const normalized = fileUrl.startsWith('/uploads/')
    ? fileUrl.slice('/uploads/'.length)
    : fileUrl.replace(/^\/+/, '');

  if (fileUrl.startsWith('/uploads/')) {
    return path.join(resolveUploadDirectory(), normalized);
  }

  if (path.isAbsolute(fileUrl)) {
    return fileUrl;
  }

  return path.join(resolveUploadDirectory(), normalized);
}

export const extractService = {
  // 문서 분석 (AI 추출 + 검증)
  async analyzeDocument(documentId: string, extractFields?: string[]) {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      throw new Error('Document not found');
    }

    // 상태 업데이트: 처리중
    await prisma.document.update({
      where: { id: documentId },
      data: { status: 'PROCESSING', aiModel: 'kimi-k2.5' },
    });

    try {
      const storedPath = resolveStoredDocumentPath(document.fileUrl);
      const aiResult = storedPath
        ? await fs.readFile(storedPath).then((buffer) =>
            aiService.extractDocumentFromFile(
              {
                filename: document.fileName,
                mimetype: document.mimeType,
                buffer,
                size: document.fileSize,
              },
              document.type,
              document.recipientId || undefined
            )
          )
        : await aiService.extractDocument(document.fileUrl, document.type, document.recipientId || undefined);

      // 검증
      const validation = this.validateExtractedData(aiResult.extractedData, document.type, extractFields);

      // DB 업데이트
      const updated = await prisma.document.update({
        where: { id: documentId },
        data: {
          extractedData: aiResult.extractedData,
          extractedText: aiResult.extractedText || null,
          confidence: aiResult.confidence,
          status: validation.isValid ? 'VALIDATED' : 'EXTRACTED',
          validationErrors: validation.errors,
          missingFields: validation.missingFields,
          pageCount: aiResult.pageCount ?? document.pageCount,
        },
      });

      // 연결된 수급자 정보 업데이트 (평가서인 경우)
      if (document.recipientId && document.type === 'EVAL_FORM') {
        await this.updateRecipientFromEvaluation(document.recipientId, aiResult.extractedData);
      }

      logger.info({ documentId, confidence: aiResult.confidence }, 'Document analyzed');

      return {
        document: updated,
        extraction: aiResult,
        validation,
      };
    } catch (err) {
      // 에러 상태 업데이트
      await prisma.document.update({
        where: { id: documentId },
        data: { status: 'ERROR' },
      });
      throw err;
    }
  },

  // 평가 문서 완전성 체크
  async checkCompleteness(recipientId: string) {
    const recipient = await prisma.recipient.findUnique({
      where: { id: recipientId },
      include: {
        documents: {
          where: {
            createdAt: {
              gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1년 내
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        evaluations: {
          orderBy: { evalDate: 'desc' },
          take: 1,
        },
      },
    });

    if (!recipient) {
      throw new Error('Recipient not found');
    }

    // 재계약 필요 여부 확인
    const needsRenewal = recipient.contractEndDate
      ? new Date(recipient.contractEndDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      : false; // 90일 내

    const requiredDocs = needsRenewal
      ? REQUIRED_DOCUMENTS.CONTRACT_RENEWAL
      : REQUIRED_DOCUMENTS.NEW_APPLICATION;

    // 보유 문서 확인
    const hasDocuments = recipient.documents.reduce((acc, doc) => {
      acc[doc.type] = {
        has: true,
        status: doc.status,
        date: doc.createdAt,
      };
      return acc;
    }, {} as Record<string, any>);

    // 누락 문서 확인
    const missing = requiredDocs.filter(type => !hasDocuments[type]);

    // 긴급도 계산
    const urgency = this.calculateUrgency(recipient, missing, needsRenewal);

    return {
      recipientId,
      recipientName: recipient.name,
      longTermCareId: recipient.longTermCareId,
      contractEndDate: recipient.contractEndDate,
      nextEvalDate: recipient.nextEvalDate,
      needsRenewal,
      requiredDocuments: requiredDocs.map(type => ({
        type,
        name: this.getDocumentTypeName(type),
        status: hasDocuments[type]?.status || 'MISSING',
        has: !!hasDocuments[type],
        date: hasDocuments[type]?.date || null,
      })),
      missingDocuments: missing.map(type => ({
        type,
        name: this.getDocumentTypeName(type),
        urgency: urgency.level,
        daysRemaining: urgency.daysRemaining,
      })),
      overallStatus: missing.length === 0 ? 'COMPLETE' : needsRenewal ? 'CRITICAL' : 'WARNING',
    };
  },

  // 추출 데이터 검증
  validateExtractedData(data: any, documentType: string, extractFields?: string[]) {
    const errors: Array<{ field: string; message: string }> = [];
    const missingFields: string[] = [];

    // 문서 타입별 필수 필드
    const requiredFields: Record<string, string[]> = {
      EVAL_FORM: ['adlScore', 'iadlScore', 'evalDate', 'evaluator'],
      DOCTOR_NOTE: ['diagnosis', 'doctorName', 'hospitalName'],
      DIAGNOSIS: ['diagnosisCode', 'diagnosisName', 'onsetDate'],
      CONTRACT: ['contractStartDate', 'contractEndDate', 'serviceType'],
    };

    const required = extractFields && extractFields.length > 0 ? extractFields : requiredFields[documentType] || [];

    for (const field of required) {
      if (!data[field]) {
        missingFields.push(field);
        errors.push({ field, message: `${field} 필드가 누락되었습니다` });
      }
    }

    // 날짜 순차성 검증
    if (data.contractStartDate && data.contractEndDate) {
      const start = new Date(data.contractStartDate);
      const end = new Date(data.contractEndDate);
      if (start > end) {
        errors.push({ field: 'contractDates', message: '계약 시작일이 종료일보다 늦습니다' });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      missingFields,
    };
  },

  // 수급자 정보 업데이트 (평가서 기반)
  async updateRecipientFromEvaluation(recipientId: string, extractedData: any) {
    const updates: any = {};

    if (extractedData.adlScore) updates.adlScore = parseInt(extractedData.adlScore);
    if (extractedData.iadlScore) updates.iadlScore = parseInt(extractedData.iadlScore);
    if (extractedData.careGrade) {
      const gradeMap: Record<string, string> = {
        '1등급': 'GRADE_1', '2등급': 'GRADE_2', '3등급': 'GRADE_3', '4등급': 'GRADE_4',
        '1': 'GRADE_1', '2': 'GRADE_2', '3': 'GRADE_3', '4': 'GRADE_4',
      };
      updates.careGrade = gradeMap[extractedData.careGrade] || extractedData.careGrade;
    }
    if (extractedData.evalDate) updates.lastEvalDate = new Date(extractedData.evalDate);

    if (Object.keys(updates).length > 0) {
      await prisma.recipient.update({
        where: { id: recipientId },
        data: updates,
      });
    }
  },

  // 긴급도 계산
  calculateUrgency(recipient: any, missing: string[], needsRenewal: boolean) {
    if (!needsRenewal) {
      return { level: 'NORMAL', daysRemaining: null };
    }

    const daysRemaining = recipient.contractEndDate
      ? Math.ceil((new Date(recipient.contractEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;

    if (daysRemaining === null) {
      return { level: 'NORMAL', daysRemaining: null };
    }

    if (daysRemaining <= 14) {
      return { level: 'CRITICAL', daysRemaining };
    } else if (daysRemaining <= 30) {
      return { level: 'HIGH', daysRemaining };
    } else if (daysRemaining <= 60) {
      return { level: 'MEDIUM', daysRemaining };
    }

    return { level: 'LOW', daysRemaining };
  },

  // 문서 타입 한글명
  getDocumentTypeName(type: string): string {
    const names: Record<string, string> = {
      EVAL_FORM: '장기요양 기능평가표',
      DOCTOR_NOTE: '의사소견서',
      DIAGNOSIS: '진단서',
      CONTRACT: '재계약신청서',
      CARE_PLAN: '돌봄계획서',
      CARE_RECORD: '서비스 제공기록',
      GENERAL: '일반 문서',
    };
    return names[type] || type;
  },
};
