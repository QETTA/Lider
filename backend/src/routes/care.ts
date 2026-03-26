import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth } from '../middleware/requireAuth';
import { loggers } from '../utils/logger';

const logger = loggers.care;
const prisma = new PrismaClient();

function getSessionUserId(request: any) {
  return typeof request.user?.sub === 'string' ? request.user.sub : null;
}

// 케어 기록 생성 스키마
const createRecordSchema = z.object({
  recipientId: z.string().uuid(),
  type: z.enum(['VISIT', 'DAY_CARE', 'OVERNIGHT', 'EMERGENCY', 'PHONE']),
  recordDate: z.string().datetime(),
  visitTime: z.string().datetime().optional(),
  leaveTime: z.string().datetime().optional(),
  bloodPressure: z.string().optional(),
  pulse: z.number().int().optional(),
  temperature: z.number().optional(),
  weight: z.number().optional(),
  bloodSugar: z.number().int().optional(),
  activities: z.array(z.object({
    type: z.string(),
    duration: z.number().optional(),
    note: z.string().optional(),
  })).optional(),
  meals: z.array(z.object({
    type: z.string(),
    intake: z.number().min(0).max(100).optional(),
    menu: z.string().optional(),
  })).optional(),
  condition: z.string().optional(),
  specialNotes: z.string().optional(),
  incidentReport: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

// 상담 일지 생성 스키마
const createConsultationSchema = z.object({
  recipientId: z.string().uuid(),
  type: z.enum(['INITIAL', 'REGULAR', 'CRISIS', 'FAMILY', 'COORDINATION']),
  date: z.string().datetime(),
  method: z.string(),
  subject: z.string(),
  content: z.string(),
  aiDraft: z.string().optional(),
  result: z.string().optional(),
  familyPresent: z.boolean().optional(),
  familyNotes: z.string().optional(),
});

export async function careRoutes(fastify: FastifyInstance) {
  // === 케어 기록 (Care Record) ===

  // 기록 목록 조회
  fastify.get('/records', {
    schema: {
      tags: ['Care'],
      summary: '케어 기록 목록 조회',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { recipientId, startDate, endDate, workerId } = request.query as any;

    const records = await prisma.careRecord.findMany({
      where: {
        ...(recipientId && { recipientId }),
        ...(workerId && { workerId }),
        ...(startDate && endDate && {
          recordDate: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
      },
      include: {
        recipient: {
          select: { name: true, careGrade: true },
        },
        worker: {
          select: { name: true },
        },
      },
      orderBy: { recordDate: 'desc' },
    });

    return {
      success: true,
      data: records,
    };
  });

  // 기록 생성
  fastify.post('/records', {
    schema: {
      tags: ['Care'],
      summary: '케어 기록 생성',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const data = createRecordSchema.parse(request.body);
    const workerId = getSessionUserId(request);

    if (!workerId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'SESSION_INVALID',
          message: '세션이 유효하지 않습니다.',
        },
      });
    }

    const record = await prisma.careRecord.create({
      data: {
        ...data,
        workerId,
        recordDate: new Date(data.recordDate),
        visitTime: data.visitTime ? new Date(data.visitTime) : undefined,
        leaveTime: data.leaveTime ? new Date(data.leaveTime) : undefined,
      },
    });

    logger.info({ recordId: record.id, recipientId: data.recipientId }, 'Care record created');

    return reply.status(201).send({
      success: true,
      data: record,
    });
  });

  // 기록 상세 조회
  fastify.get('/records/:id', {
    schema: {
      tags: ['Care'],
      summary: '케어 기록 상세 조회',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { id } = request.params as { id: string };

    const record = await prisma.careRecord.findUnique({
      where: { id },
      include: {
        recipient: true,
        worker: { select: { name: true, email: true } },
      },
    });

    if (!record) {
      throw { statusCode: 404, message: '기록을 찾을 수 없습니다' };
    }

    return {
      success: true,
      data: record,
    };
  });

  // === 상담 일지 (Consultation) ===

  // 상담 목록 조회
  fastify.get('/consultations', {
    schema: {
      tags: ['Care'],
      summary: '상담 일지 목록 조회',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { recipientId, startDate, endDate } = request.query as any;

    const consultations = await prisma.consultation.findMany({
      where: {
        ...(recipientId && { recipientId }),
        ...(startDate && endDate && {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
      },
      include: {
        recipient: {
          select: { name: true },
        },
        worker: {
          select: { name: true },
        },
      },
      orderBy: { date: 'desc' },
    });

    return {
      success: true,
      data: consultations,
    };
  });

  // 상담 생성
  fastify.post('/consultations', {
    schema: {
      tags: ['Care'],
      summary: '상담 일지 생성',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const data = createConsultationSchema.parse(request.body);
    const workerId = getSessionUserId(request);

    if (!workerId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'SESSION_INVALID',
          message: '세션이 유효하지 않습니다.',
        },
      });
    }

    const consultation = await prisma.consultation.create({
      data: {
        ...data,
        workerId,
        date: new Date(data.date),
      },
    });

    logger.info({ consultationId: consultation.id }, 'Consultation created');

    return reply.status(201).send({
      success: true,
      data: consultation,
    });
  });

  // 상담 수정 (AI 초안 수정용)
  fastify.patch('/consultations/:id', {
    schema: {
      tags: ['Care'],
      summary: '상담 일지 수정',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { id } = request.params as { id: string };
    const data = request.body as any;

    const consultation = await prisma.consultation.update({
      where: { id },
      data: {
        ...data,
        aiEdited: data.content ? true : undefined,
      },
    });

    return {
      success: true,
      data: consultation,
    };
  });
}
