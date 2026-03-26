import type { MultipartFile } from '@fastify/multipart';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { loggers } from '../utils/logger';
import { aiService } from '../services/aiService';

const logger = loggers.ai;

// 문서 추출 요청 스키마
const extractSchema = z.object({
  documentUrl: z.string().url(),
  documentType: z.enum(['EVAL_FORM', 'DOCTOR_NOTE', 'DIAGNOSIS', 'CONTRACT', 'CARE_PLAN']),
  recipientId: z.string().uuid().optional(),
});

// 상담 초안 생성 스키마
const consultationDraftSchema = z.object({
  careRecords: z.array(z.object({
    date: z.string(),
    content: z.string(),
    activities: z.array(z.string()).optional(),
  })),
  previousConsultations: z.array(z.string()).optional(),
  subject: z.string().optional(),
  familyContext: z.string().optional(),
});

// 통합 검색 스키마
const searchSchema = z.object({
  query: z.string().min(1),
  context: z.object({
    recipientId: z.string().uuid().optional(),
    workerId: z.string().uuid().optional(),
    centerId: z.string().uuid().optional(),
  }).optional(),
  filters: z.object({
    type: z.enum(['all', 'documents', 'records', 'consultations']).default('all'),
    dateRange: z.object({
      from: z.string().optional(),
      to: z.string().optional(),
    }).optional(),
  }).optional(),
});

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1),
      })
    )
    .min(1),
  context: z
    .object({
      route: z.string().optional(),
      centerName: z.string().optional(),
      mode: z.string().optional(),
    })
    .optional(),
});

const fileAnalysisFieldsSchema = z.object({
  prompt: z.string().max(3000).optional(),
  route: z.string().optional(),
  centerName: z.string().optional(),
  mode: z.string().optional(),
});

export async function aiRoutes(fastify: FastifyInstance) {
  // 문서 AI 추출 (Extract)
  fastify.post('/extract', {
    schema: {
      tags: ['AI'],
      summary: 'AI 문서 추출',
      description: 'Kimi AI로 문서에서 요양 관련 필드를 추출합니다',
    },
  }, async (request, reply) => {
    const data = extractSchema.parse(request.body);

    logger.info({ documentType: data.documentType }, 'Starting AI document extraction');

    try {
      const result = await aiService.extractDocument(
        data.documentUrl,
        data.documentType,
        data.recipientId
      );

      return reply.status(201).send({
        success: true,
        data: result,
        model: 'kimi-k2.5',
      });
    } catch (err) {
      logger.error(err, 'AI extraction failed');
      throw err;
    }
  });

  // 상담 일지 초안 생성 (Assist)
  fastify.post('/consultation-draft', {
    schema: {
      tags: ['AI'],
      summary: '상담 일지 AI 초안',
      description: '케어 기록을 바탕으로 상담 일지 초안을 생성합니다',
    },
  }, async (request, reply) => {
    const data = consultationDraftSchema.parse(request.body);

    try {
      const draft = await aiService.generateConsultationDraftFromRecords(
        data.careRecords,
        data.previousConsultations,
        data.subject,
        data.familyContext
      );

      return reply.status(201).send({
        success: true,
        data: draft,
      });
    } catch (err) {
      logger.error(err, 'Consultation draft generation failed');
      throw err;
    }
  });

  fastify.post('/chat', {
    schema: {
      tags: ['AI'],
      summary: 'AI 도우미 채팅',
      description: 'Claude 기반 AI 도우미와 운영 질문을 주고받습니다',
    },
  }, async (request, reply) => {
    const data = chatSchema.parse(request.body);

    try {
      const result = await aiService.chatWithAssistant(data.messages, data.context);

      return reply.status(201).send({
        success: true,
        data: result,
      });
    } catch (err) {
      logger.error(err, 'AI chat failed');
      throw err;
    }
  });

  fastify.post('/analyze-file', {
    schema: {
      tags: ['AI'],
      summary: 'AI 도우미 파일 분석',
      description: 'Claude 기반 엑셀 스킬 패키지와 문서 스킬 패키지로 첨부 파일을 분석합니다',
      consumes: ['multipart/form-data'],
    },
  }, async (request, reply) => {
    const parts = request.parts();
    const fieldValues: Record<string, string> = {};
    let filePart: MultipartFile | null = null;

    for await (const part of parts) {
      if (part.type === 'file') {
        filePart = part;
        continue;
      }

      fieldValues[part.fieldname] = typeof part.value === 'string' ? part.value : String(part.value ?? '');
    }

    if (!filePart) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'NO_FILE',
          message: '분석할 파일이 없습니다.',
        },
      });
    }

    const data = fileAnalysisFieldsSchema.parse(fieldValues);
    const buffer = await filePart.toBuffer();

    try {
      const result = await aiService.analyzeFileWithAssistant(
        {
          filename: filePart.filename || 'upload',
          mimetype: filePart.mimetype,
          buffer,
          size: buffer.byteLength,
          prompt: data.prompt,
        },
        {
          route: data.route,
          centerName: data.centerName,
          mode: data.mode,
        }
      );

      return reply.status(201).send({
        success: true,
        data: result,
      });
    } catch (err) {
      logger.error(
        {
          err,
          fileName: filePart.filename,
          mimeType: filePart.mimetype,
        },
        'AI file analysis failed'
      );
      throw err;
    }
  });

  // 통합 검색 (Assist)
  fastify.post('/search', {
    schema: {
      tags: ['AI'],
      summary: 'AI 통합 검색',
      description: '자연어로 수급자 정보를 검색합니다',
    },
  }, async (request) => {
    const data = searchSchema.parse(request.body);

    const result = await aiService.intelligentSearch(
      data.query,
      data.context,
      data.filters
    );

    return {
      success: true,
      data: result,
    };
  });

  // AI 모델 상태 확인
  fastify.get('/status', {
    schema: {
      tags: ['AI'],
      summary: 'AI 서비스 상태',
    },
  }, async () => {
    const status = await aiService.checkStatus();

    return {
      success: true,
      data: status,
    };
  });
}
