import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth } from '../middleware/requireAuth';
import { loggers } from '../utils/logger';
import { aiService } from '../services/aiService';

const logger = loggers.mobile;
const prisma = new PrismaClient();

function getSessionUserId(request: any) {
  return typeof request.user?.sub === 'string' ? request.user.sub : null;
}

// 빠른 기록 스키마 (Mobile Entry)
const quickEntrySchema = z.object({
  recipientId: z.string().uuid(),
  type: z.enum(['VISIT', 'DAY_CARE', 'OVERNIGHT']),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
  }).optional(),
  photos: z.array(z.string()).optional(),
});

// 음성 기록 변환 결과 저장
const voiceEntrySchema = z.object({
  recipientId: z.string().uuid(),
  audioUrl: z.string(),
  transcribedText: z.string(),
});

export async function mobileRoutes(fastify: FastifyInstance) {
  // 오늘 방문할 수급자 목록 (Mobile용)
  fastify.get('/today-visits', {
    schema: {
      tags: ['Mobile'],
      summary: '오늘 방문 일정',
      description: '오늘 방문 예정인 수급자 목록 (Mobile Entry용)',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { workerId } = request.query as any;
    const sessionUserId = getSessionUserId(request);

    // TODO: 일정 관리 테이블 연동 시 구현
    // 현재는 최근 방문한 수급자 기준으로 반환
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const records = await prisma.careRecord.findMany({
      where: {
        workerId: workerId || sessionUserId || undefined,
        recordDate: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      include: {
        recipient: {
          select: {
            id: true,
            name: true,
            address: true,
            careGrade: true,
            phone: true,
          },
        },
      },
      orderBy: { visitTime: 'asc' },
    });

    return {
      success: true,
      data: records,
    };
  });

  // 빠른 방문 기록 (1-tap Entry)
  fastify.post('/quick-entry', {
    schema: {
      tags: ['Mobile'],
      summary: '빠른 방문 기록',
      description: 'GPS + 시간 + 사진으로 빠른 방문 기록 생성',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const data = quickEntrySchema.parse(request.body);
    const now = new Date();
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
        recipientId: data.recipientId,
        workerId,
        type: data.type,
        recordDate: now,
        visitTime: now,
        location: data.location,
        photos: data.photos,
        condition: '방문 시작 - 상세 기록 필요',
      },
    });

    logger.info({ recordId: record.id, location: data.location }, 'Quick entry created');

    return reply.status(201).send({
      success: true,
      data: {
        recordId: record.id,
        startedAt: now,
        message: '방문 기록이 생성되었습니다. 종료 시 기록을 완료해주세요.',
      },
    });
  });

  // 방문 종료 및 상세 기록
  fastify.patch('/complete-visit/:recordId', {
    schema: {
      tags: ['Mobile'],
      summary: '방문 종료 및 기록 완료',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { recordId } = request.params as { recordId: string };
    const data = request.body as any;

    const record = await prisma.careRecord.update({
      where: { id: recordId },
      data: {
        leaveTime: new Date(),
        ...data,
      },
    });

    return {
      success: true,
      data: record,
    };
  });

  // 음성 기록 → AI 상담 초안
  fastify.post('/voice-to-draft', {
    schema: {
      tags: ['Mobile'],
      summary: '음성 기록 AI 변환',
      description: '음성 기록을 AI로 변환하여 상담 일지 초안 생성',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const data = voiceEntrySchema.parse(request.body);

    // AI로 음성 내용 분석하여 상담 초안 생성
    const aiDraft = await aiService.generateConsultationDraft(data.transcribedText);

    // 미리보기용으로 상담 일지 생성 (저장은 별도)
    const draft = {
      recipientId: data.recipientId,
      type: 'REGULAR',
      date: new Date(),
      method: '대면',
      subject: aiDraft.subject || '음성 기록 상담',
      content: aiDraft.content,
      aiDraft: aiDraft.content,
      aiEdited: false,
    };

    return reply.status(201).send({
      success: true,
      data: {
        draft,
        transcribedText: data.transcribedText,
        actionItems: aiDraft.actionItems || [],
      },
    });
  });

  // 오프라인 동기화 (PWA)
  fastify.post('/sync', {
    schema: {
      tags: ['Mobile'],
      summary: '오프라인 기록 동기화',
      description: '오프라인 중 생성된 기록을 서버와 동기화',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const workerId = getSessionUserId(request);
    const { records } = request.body as { records: any[] };

    const results = await Promise.all(
      records.map(async (record) => {
        try {
          const created = await prisma.careRecord.create({
            data: {
              ...record,
              workerId: workerId || undefined,
            },
          });
          return { success: true, localId: record.localId, serverId: created.id };
        } catch (err) {
          return { success: false, localId: record.localId, error: (err as Error).message };
        }
      })
    );

    return {
      success: true,
      data: {
        synced: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results,
      },
    };
  });
}
