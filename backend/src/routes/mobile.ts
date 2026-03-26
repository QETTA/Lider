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

// 방문 일정 생성/수정 스키마
const scheduleSchema = z.object({
  recipientId: z.string().uuid(),
  scheduledDate: z.string().datetime(), // ISO 8601
  scheduledTime: z.string().datetime().optional(),
  estimatedDurationMinutes: z.number().int().min(5).max(480).optional(),
  visitType: z.enum(['VISIT', 'DAY_CARE', 'OVERNIGHT', 'EMERGENCY', 'PHONE']).default('VISIT'),
  notes: z.string().max(1000).optional(),
  locationNote: z.string().max(500).optional(),
});

const scheduleUpdateSchema = z.object({
  scheduledDate: z.string().datetime().optional(),
  scheduledTime: z.string().datetime().optional(),
  estimatedDurationMinutes: z.number().int().min(5).max(480).optional(),
  visitType: z.enum(['VISIT', 'DAY_CARE', 'OVERNIGHT', 'EMERGENCY', 'PHONE']).optional(),
  notes: z.string().max(1000).optional(),
  locationNote: z.string().max(500).optional(),
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'SKIPPED']).optional(),
});

export async function mobileRoutes(fastify: FastifyInstance) {
  // 오늘 방문할 수급자 목록 (Mobile용)
  fastify.get('/today-visits', {
    schema: {
      tags: ['Mobile'],
      summary: '오늘 방문 일정',
      description: '오늘 방문 예정인 수급자 목록 (Mobile Entry용). VisitSchedule 기반으로 예정된 방문을 조회합니다.',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { workerId } = request.query as any;
    const sessionUserId = getSessionUserId(request);
    const targetWorkerId = workerId || sessionUserId;

    if (!targetWorkerId) {
      return {
        success: true,
        data: [],
        meta: { message: '세션 정보가 없습니다' },
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    // VisitSchedule 기반으로 오늘 예정된 방문 조회
    const schedules = await prisma.visitSchedule.findMany({
      where: {
        workerId: targetWorkerId,
        scheduledDate: {
          gte: today,
          lt: tomorrow,
        },
        status: { in: ['SCHEDULED', 'IN_PROGRESS'] },
      },
      include: {
        recipient: {
          select: {
            id: true,
            name: true,
            address: true,
            careGrade: true,
            phone: true,
            longTermCareId: true,
          },
        },
      },
      orderBy: [{ scheduledTime: 'asc' }, { createdAt: 'asc' }],
    });

    // VisitSchedule이 없는 경우 기존 CareRecord에서 fallback 조회
    if (schedules.length === 0) {
      const fallbackRecords = await prisma.careRecord.findMany({
        where: {
          workerId: targetWorkerId,
          recordDate: {
            gte: today,
            lt: tomorrow,
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
              longTermCareId: true,
            },
          },
        },
        orderBy: { visitTime: 'asc' },
        take: 10,
      });

      return {
        success: true,
        data: fallbackRecords.map(r => ({
          type: 'fallback_record',
          recordId: r.id,
          recipient: r.recipient,
          status: r.leaveTime ? 'COMPLETED' : 'IN_PROGRESS',
          scheduledTime: r.visitTime,
          estimatedDurationMinutes: r.leaveTime && r.visitTime
            ? Math.round((new Date(r.leaveTime).getTime() - new Date(r.visitTime).getTime()) / 60000)
            : null,
          notes: r.specialNotes,
        })),
        meta: {
          source: 'care_record_fallback',
          message: 'VisitSchedule이 없어 기존 기록에서 조회했습니다',
        },
      };
    }

    return {
      success: true,
      data: schedules.map(s => ({
        scheduleId: s.id,
        recipient: s.recipient,
        status: s.status,
        visitType: s.visitType,
        scheduledTime: s.scheduledTime,
        estimatedDurationMinutes: s.estimatedDurationMinutes,
        notes: s.notes,
        locationNote: s.locationNote,
      })),
      meta: {
        source: 'visit_schedule',
        count: schedules.length,
      },
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

  // ====================
  // VisitSchedule CRUD APIs
  // ====================

  // 방문 일정 생성
  fastify.post('/schedules', {
    schema: {
      tags: ['Mobile', 'Schedule'],
      summary: '방문 일정 생성',
      description: '새로운 방문 일정을 생성합니다',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const data = scheduleSchema.parse(request.body);
    const workerId = getSessionUserId(request);

    if (!workerId) {
      return reply.status(401).send({
        success: false,
        error: { code: 'SESSION_INVALID', message: '세션이 유효하지 않습니다.' },
      });
    }

    const schedule = await prisma.visitSchedule.create({
      data: {
        workerId,
        recipientId: data.recipientId,
        scheduledDate: new Date(data.scheduledDate),
        scheduledTime: data.scheduledTime ? new Date(data.scheduledTime) : null,
        estimatedDurationMinutes: data.estimatedDurationMinutes,
        visitType: data.visitType,
        notes: data.notes,
        locationNote: data.locationNote,
        status: 'SCHEDULED',
      },
      include: {
        recipient: {
          select: { id: true, name: true, address: true, careGrade: true, phone: true },
        },
      },
    });

    logger.info({ scheduleId: schedule.id, workerId }, 'Visit schedule created');

    return reply.status(201).send({
      success: true,
      data: schedule,
      message: '방문 일정이 생성되었습니다.',
    });
  });

  // 방문 일정 목록 조회 (기간별, 상태별 필터)
  fastify.get('/schedules', {
    schema: {
      tags: ['Mobile', 'Schedule'],
      summary: '방문 일정 목록',
      description: '기간과 상태로 필터링된 방문 일정 목록을 조회합니다',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const workerId = getSessionUserId(request);
    const { from, to, status, recipientId } = request.query as {
      from?: string;
      to?: string;
      status?: string;
      recipientId?: string;
    };

    if (!workerId) {
      return { success: true, data: [], meta: { message: '세션 정보가 없습니다' } };
    }

    const where: any = { workerId };

    if (from && to) {
      where.scheduledDate = {
        gte: new Date(from),
        lte: new Date(to),
      };
    }

    if (status) {
      where.status = { in: status.split(',') };
    }

    if (recipientId) {
      where.recipientId = recipientId;
    }

    const schedules = await prisma.visitSchedule.findMany({
      where,
      include: {
        recipient: {
          select: { id: true, name: true, address: true, careGrade: true, phone: true },
        },
      },
      orderBy: [{ scheduledDate: 'asc' }, { scheduledTime: 'asc' }],
    });

    // 날짜별 그룹핑
    const grouped = schedules.reduce((acc, schedule) => {
      const dateKey = schedule.scheduledDate.toISOString().split('T')[0];
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(schedule);
      return acc;
    }, {} as Record<string, typeof schedules>);

    return {
      success: true,
      data: schedules,
      grouped,
      meta: {
        total: schedules.length,
        byStatus: {
          scheduled: schedules.filter(s => s.status === 'SCHEDULED').length,
          inProgress: schedules.filter(s => s.status === 'IN_PROGRESS').length,
          completed: schedules.filter(s => s.status === 'COMPLETED').length,
          cancelled: schedules.filter(s => s.status === 'CANCELLED').length,
        },
      },
    };
  });

  // 방문 일정 상세 조회
  fastify.get('/schedules/:id', {
    schema: {
      tags: ['Mobile', 'Schedule'],
      summary: '방문 일정 상세',
      description: '특정 방문 일정의 상세 정보를 조회합니다',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const workerId = getSessionUserId(request);

    const schedule = await prisma.visitSchedule.findFirst({
      where: { id, workerId },
      include: {
        recipient: {
          select: {
            id: true,
            name: true,
            address: true,
            careGrade: true,
            phone: true,
            emergencyPhone: true,
            longTermCareId: true,
            specialNotes: true,
          },
        },
      },
    });

    if (!schedule) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: '방문 일정을 찾을 수 없습니다.' },
      });
    }

    return { success: true, data: schedule };
  });

  // 방문 일정 수정
  fastify.patch('/schedules/:id', {
    schema: {
      tags: ['Mobile', 'Schedule'],
      summary: '방문 일정 수정',
      description: '방문 일정의 정보를 수정합니다',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = scheduleUpdateSchema.parse(request.body);
    const workerId = getSessionUserId(request);

    const existing = await prisma.visitSchedule.findFirst({
      where: { id, workerId },
    });

    if (!existing) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: '방문 일정을 찾을 수 없습니다.' },
      });
    }

    // 완료된 일정은 수정 불가 (상태 변경만 가능)
    if (existing.status === 'COMPLETED' && (data.scheduledDate || data.scheduledTime)) {
      return reply.status(400).send({
        success: false,
        error: { code: 'COMPLETED_SCHEDULE', message: '완료된 일정의 시간은 수정할 수 없습니다.' },
      });
    }

    const updated = await prisma.visitSchedule.update({
      where: { id },
      data: {
        scheduledDate: data.scheduledDate ? new Date(data.scheduledDate) : undefined,
        scheduledTime: data.scheduledTime ? new Date(data.scheduledTime) : undefined,
        estimatedDurationMinutes: data.estimatedDurationMinutes,
        visitType: data.visitType,
        notes: data.notes,
        locationNote: data.locationNote,
        status: data.status,
        completedAt: data.status === 'COMPLETED' && !existing.completedAt ? new Date() : undefined,
      },
      include: {
        recipient: {
          select: { id: true, name: true, address: true, careGrade: true, phone: true },
        },
      },
    });

    logger.info({ scheduleId: id, updates: Object.keys(data) }, 'Visit schedule updated');

    return {
      success: true,
      data: updated,
      message: '방문 일정이 수정되었습니다.',
    };
  });

  // 방문 일정 삭제
  fastify.delete('/schedules/:id', {
    schema: {
      tags: ['Mobile', 'Schedule'],
      summary: '방문 일정 삭제',
      description: '방문 일정을 삭제합니다 (완료된 일정은 삭제 불가)',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const workerId = getSessionUserId(request);

    const existing = await prisma.visitSchedule.findFirst({
      where: { id, workerId },
    });

    if (!existing) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: '방문 일정을 찾을 수 없습니다.' },
      });
    }

    if (existing.status === 'COMPLETED') {
      return reply.status(400).send({
        success: false,
        error: { code: 'COMPLETED_SCHEDULE', message: '완료된 일정은 삭제할 수 없습니다.' },
      });
    }

    await prisma.visitSchedule.delete({ where: { id } });

    logger.info({ scheduleId: id }, 'Visit schedule deleted');

    return {
      success: true,
      message: '방문 일정이 삭제되었습니다.',
    };
  });

  // 방문 시작 (IN_PROGRESS로 변경)
  fastify.post('/schedules/:id/start', {
    schema: {
      tags: ['Mobile', 'Schedule'],
      summary: '방문 시작',
      description: '방문 일정을 진행중 상태로 변경하고 CareRecord를 생성합니다',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const workerId = getSessionUserId(request);
    const { location } = request.body as { location?: { lat: number; lng: number; address: string } };

    const schedule = await prisma.visitSchedule.findFirst({
      where: { id, workerId },
      include: {
        recipient: {
          select: { id: true, name: true },
        },
      },
    });

    if (!schedule) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: '방문 일정을 찾을 수 없습니다.' },
      });
    }

    if (schedule.status === 'COMPLETED') {
      return reply.status(400).send({
        success: false,
        error: { code: 'ALREADY_COMPLETED', message: '이미 완료된 방문입니다.' },
      });
    }

    const now = new Date();

    // CareRecord 생성
    const careRecord = await prisma.careRecord.create({
      data: {
        recipientId: schedule.recipientId,
        workerId,
        type: schedule.visitType,
        recordDate: now,
        visitTime: now,
        location,
        condition: '방문 시작',
      },
    });

    // VisitSchedule 업데이트
    const updated = await prisma.visitSchedule.update({
      where: { id },
      data: {
        status: 'IN_PROGRESS',
        relatedCareRecordId: careRecord.id,
      },
    });

    logger.info({ scheduleId: id, careRecordId: careRecord.id }, 'Visit started');

    return {
      success: true,
      data: {
        schedule: updated,
        careRecord,
      },
      message: '방문이 시작되었습니다.',
    };
  });

  // 방문 완료
  fastify.post('/schedules/:id/complete', {
    schema: {
      tags: ['Mobile', 'Schedule'],
      summary: '방문 완료',
      description: '방문 일정을 완료 상태로 변경하고 CareRecord를 업데이트합니다',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const workerId = getSessionUserId(request);
    const completionData = request.body as any;

    const schedule = await prisma.visitSchedule.findFirst({
      where: { id, workerId },
    });

    if (!schedule) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: '방문 일정을 찾을 수 없습니다.' },
      });
    }

    const now = new Date();

    // CareRecord 업데이트 (있는 경우)
    if (schedule.relatedCareRecordId) {
      await prisma.careRecord.update({
        where: { id: schedule.relatedCareRecordId },
        data: {
          leaveTime: now,
          ...completionData,
        },
      });
    }

    // VisitSchedule 완료 처리
    const updated = await prisma.visitSchedule.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        completedAt: now,
      },
    });

    logger.info({ scheduleId: id, duration: schedule.estimatedDurationMinutes }, 'Visit completed');

    return {
      success: true,
      data: updated,
      message: '방문이 완료되었습니다.',
    };
  });
}
