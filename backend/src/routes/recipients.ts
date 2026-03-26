import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth } from '../middleware/requireAuth';
import { loggers } from '../utils/logger';

const logger = loggers.care;
const prisma = new PrismaClient();

function getSessionCenterId(request: any) {
  return typeof request.user?.centerId === 'string' ? request.user.centerId : null;
}

// 수급자 생성 스키마
const createRecipientSchema = z.object({
  name: z.string().min(1),
  birthDate: z.string().datetime(),
  gender: z.enum(['MALE', 'FEMALE']),
  phone: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  longTermCareId: z.string().optional(),
  careGrade: z.enum(['GRADE_1', 'GRADE_2', 'GRADE_3', 'GRADE_4', 'PENDING']).optional(),
  gradeType: z.enum(['GENERAL', 'DEMENTIA', 'HOSPICE']).optional(),
  careStartDate: z.string().datetime().optional(),
  careEndDate: z.string().datetime().optional(),
  contractEndDate: z.string().datetime().optional(),
  diseases: z.array(z.object({ code: z.string(), name: z.string() })).optional(),
  specialNotes: z.string().optional(),
});

// 수급자 업데이트 스키마
const updateRecipientSchema = createRecipientSchema.partial();

export async function recipientRoutes(fastify: FastifyInstance) {
  // 수급자 목록 조회
  fastify.get('/', {
    schema: {
      tags: ['Care'],
      summary: '수급자 목록 조회',
      description: '센터의 수급자 목록을 조회합니다',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { centerId, grade, status, search } = request.query as any;

    const recipients = await prisma.recipient.findMany({
      where: {
        ...(centerId && { centerId }),
        ...(grade && { careGrade: grade }),
        ...(status === 'active' && { isActive: true }),
        ...(status === 'inactive' && { isActive: false }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { longTermCareId: { contains: search } },
          ],
        }),
      },
      include: {
        _count: {
          select: { documents: true, records: true, consultations: true },
        },
      },
      orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
    });

    return {
      success: true,
      data: recipients,
      meta: { total: recipients.length },
    };
  });

  // 수급자 상세 조회
  fastify.get('/:id', {
    schema: {
      tags: ['Care'],
      summary: '수급자 상세 조회',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { id } = request.params as { id: string };

    const recipient = await prisma.recipient.findUnique({
      where: { id },
      include: {
        documents: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        evaluations: {
          orderBy: { evalDate: 'desc' },
          take: 3,
        },
        records: {
          orderBy: { recordDate: 'desc' },
          take: 5,
        },
        center: {
          select: { name: true },
        },
      },
    });

    if (!recipient) {
      throw { statusCode: 404, message: '수급자를 찾을 수 없습니다' };
    }

    return {
      success: true,
      data: recipient,
    };
  });

  // 수급자 생성
  fastify.post('/', {
    schema: {
      tags: ['Care'],
      summary: '수급자 등록',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const data = createRecipientSchema.parse(request.body);
    const centerId = getSessionCenterId(request);

    if (!centerId) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'CENTER_REQUIRED',
          message: '센터 정보가 없는 세션입니다.',
        },
      });
    }

    const recipient = await prisma.recipient.create({
      data: {
        ...data,
        birthDate: new Date(data.birthDate),
        careStartDate: data.careStartDate ? new Date(data.careStartDate) : undefined,
        careEndDate: data.careEndDate ? new Date(data.careEndDate) : undefined,
        contractEndDate: data.contractEndDate ? new Date(data.contractEndDate) : undefined,
        centerId,
      },
    });

    logger.info({ recipientId: recipient.id }, 'Recipient created');

    return reply.status(201).send({
      success: true,
      data: recipient,
    });
  });

  // 수급자 정보 수정
  fastify.patch('/:id', {
    schema: {
      tags: ['Care'],
      summary: '수급자 정보 수정',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { id } = request.params as { id: string };
    const data = updateRecipientSchema.parse(request.body);

    const recipient = await prisma.recipient.update({
      where: { id },
      data: {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        careStartDate: data.careStartDate ? new Date(data.careStartDate) : undefined,
        careEndDate: data.careEndDate ? new Date(data.careEndDate) : undefined,
        contractEndDate: data.contractEndDate ? new Date(data.contractEndDate) : undefined,
      },
    });

    logger.info({ recipientId: id }, 'Recipient updated');

    return {
      success: true,
      data: recipient,
    };
  });

  // 수급자 삭제 (소프트 삭제)
  fastify.delete('/:id', {
    schema: {
      tags: ['Care'],
      summary: '수급자 삭제',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { id } = request.params as { id: string };

    await prisma.recipient.update({
      where: { id },
      data: { isActive: false },
    });

    logger.info({ recipientId: id }, 'Recipient deactivated');

    return {
      success: true,
      data: { message: '수급자가 삭제되었습니다' },
    };
  });

  // 재계약 임박 수급자 조회
  fastify.get('/alerts/contract-renewal', {
    schema: {
      tags: ['Care'],
      summary: '재계약 임박 알림',
      description: '3개월 내 재계약이 필요한 수급자 목록',
    },
    preHandler: requireAuth,
  }, async () => {
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    const recipients = await prisma.recipient.findMany({
      where: {
        isActive: true,
        contractEndDate: {
          lte: threeMonthsLater,
          gte: new Date(),
        },
      },
      orderBy: { contractEndDate: 'asc' },
    });

    return {
      success: true,
      data: recipients.map(r => ({
        ...r,
        daysUntilRenewal: r.contractEndDate 
          ? Math.ceil((r.contractEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : null,
      })),
    };
  });

  // 평가 만료 임박 수급자 조회
  fastify.get('/alerts/evaluation-expiry', {
    schema: {
      tags: ['Care'],
      summary: '평가 만료 임박 알림',
    },
    preHandler: requireAuth,
  }, async () => {
    const recipients = await prisma.recipient.findMany({
      where: {
        isActive: true,
        nextEvalDate: {
          lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 내
          gte: new Date(),
        },
      },
      orderBy: { nextEvalDate: 'asc' },
    });

    return {
      success: true,
      data: recipients,
    };
  });
}
