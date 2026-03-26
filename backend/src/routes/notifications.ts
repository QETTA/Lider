import { FastifyInstance, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { requireAuth } from '../middleware/requireAuth';
import { notificationService } from '../services/notificationService';

// 세션 유저 ID 추출
function getSessionUserId(request: FastifyRequest): string | null {
  const user = (request as unknown as Record<string, unknown>).user;
  return typeof user === 'object' && user !== null && 'sub' in user
    ? (user as Record<string, unknown>).sub as string
    : null;
}

// 알림 생성 스키마 (Admin용)
const createNotificationSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum([
    'VISIT_REMINDER',
    'VISIT_OVERDUE',
    'VISIT_COMPLETED',
    'SCHEDULE_CHANGED',
    'NEW_DOCUMENT',
    'CONSULTATION_DUE',
    'EMERGENCY_ALERT',
    'SYSTEM_NOTICE',
  ]),
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(1000),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).default('NORMAL'),
  relatedEntityType: z.string().optional(),
  relatedEntityId: z.string().optional(),
  scheduledFor: z.string().datetime().optional(),
});

export async function notificationRoutes(fastify: FastifyInstance) {
  // 사용자 알림 목록 조회
  fastify.get('/', {
    schema: {
      tags: ['Notifications'],
      summary: '알림 목록 조회',
      description: '현재 사용자의 알림 목록을 조회합니다 (페이지네이션 지원)',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const userId = getSessionUserId(request);
    if (!userId) {
      return { success: false, error: { code: 'UNAUTHORIZED', message: '인증이 필요합니다' } };
    }

    const query = request.query as Record<string, string | undefined>;
    const unreadOnly = query.unreadOnly === 'true';
    const limit = query.limit ? parseInt(query.limit, 10) : 20;
    const offset = query.offset ? parseInt(query.offset, 10) : 0;

    const result = await notificationService.getUserNotifications(userId, {
      unreadOnly,
      limit,
      offset,
    });

    return {
      success: true,
      data: result.notifications,
      meta: {
        unreadCount: result.unreadCount,
        hasMore: result.hasMore,
      },
    };
  });

  // 읽지 않은 알림 수 조회 (헤더/배지용)
  fastify.get('/unread-count', {
    schema: {
      tags: ['Notifications'],
      summary: '읽지 않은 알림 수',
      description: '읽지 않은 알림 개수를 조회합니다',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const userId = getSessionUserId(request);
    if (!userId) {
      return { success: false, error: { code: 'UNAUTHORIZED', message: '인증이 필요합니다' } };
    }

    const result = await notificationService.getUserNotifications(userId, { unreadOnly: true, limit: 1 });

    return {
      success: true,
      data: { unreadCount: result.unreadCount },
    };
  });

  // 알림 읽음 처리
  fastify.patch('/:id/read', {
    schema: {
      tags: ['Notifications'],
      summary: '알림 읽음 처리',
      description: '특정 알림을 읽음 상태로 표시합니다',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const userId = getSessionUserId(request);
    if (!userId) {
      return reply.status(401).send({ success: false, error: { code: 'UNAUTHORIZED', message: '인증이 필요합니다' } });
    }

    const { id } = request.params as { id: string };

    try {
      await notificationService.markAsRead(id, userId);
      return { success: true, message: '알림이 읽음 처리되었습니다' };
    } catch (err) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: (err as Error).message },
      });
    }
  });

  // 모든 알림 읽음 처리
  fastify.patch('/read-all', {
    schema: {
      tags: ['Notifications'],
      summary: '모든 알림 읽음 처리',
      description: '모든 읽지 않은 알림을 읽음 상태로 표시합니다',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const userId = getSessionUserId(request);
    if (!userId) {
      return { success: false, error: { code: 'UNAUTHORIZED', message: '인증이 필요합니다' } };
    }

    const result = await notificationService.markAllAsRead(userId);

    return {
      success: true,
      message: '모든 알림이 읽음 처리되었습니다',
      data: { markedCount: result.markedCount },
    };
  });

  // 알림 삭제
  fastify.delete('/:id', {
    schema: {
      tags: ['Notifications'],
      summary: '알림 삭제',
      description: '특정 알림을 삭제합니다',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const userId = getSessionUserId(request);
    if (!userId) {
      return reply.status(401).send({ success: false, error: { code: 'UNAUTHORIZED', message: '인증이 필요합니다' } });
    }

    const { id } = request.params as { id: string };

    await notificationService.deleteNotification(id, userId);

    return { success: true, message: '알림이 삭제되었습니다' };
  });

  // Admin: 알림 수동 생성
  fastify.post('/', {
    schema: {
      tags: ['Notifications', 'Admin'],
      summary: '알림 생성 (Admin)',
      description: '관리자가 특정 사용자에게 알림을 발송합니다',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const userId = getSessionUserId(request);
    if (!userId) {
      return reply.status(401).send({ success: false, error: { code: 'UNAUTHORIZED', message: '인증이 필요합니다' } });
    }

    // TODO: Admin 권한 체크 추가

    const data = createNotificationSchema.parse(request.body);

    const notification = await notificationService.createNotification({
      userId: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      priority: data.priority,
      relatedEntityType: data.relatedEntityType,
      relatedEntityId: data.relatedEntityId,
      scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : undefined,
    });

    return reply.status(201).send({
      success: true,
      data: notification,
      message: '알림이 생성되었습니다',
    });
  });

  // Admin: 방문 예정 알림 일괄 생성
  fastify.post('/batch/visit-reminders', {
    schema: {
      tags: ['Notifications', 'Admin'],
      summary: '방문 예정 알림 일괄 생성',
      description: '30분 내 예정된 방문에 대한 알림을 일괄 생성합니다',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const userId = getSessionUserId(request);
    if (!userId) {
      return { success: false, error: { code: 'UNAUTHORIZED', message: '인증이 필요합니다' } };
    }

    // TODO: Admin 권한 체크

    const notifications = await notificationService.createVisitReminders();

    return {
      success: true,
      data: { createdCount: notifications.length, notifications },
      message: `${notifications.length}개의 방문 예정 알림이 생성되었습니다`,
    };
  });

  // Admin: 지연 방문 알림 체크
  fastify.post('/batch/check-overdue', {
    schema: {
      tags: ['Notifications', 'Admin'],
      summary: '지연 방문 알림 체크',
      description: '지연된 방문을 체크하고 알림을 발송합니다',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const userId = getSessionUserId(request);
    if (!userId) {
      return { success: false, error: { code: 'UNAUTHORIZED', message: '인증이 필요합니다' } };
    }

    // TODO: Admin 권한 체크

    const notifications = await notificationService.checkOverdueVisits();

    return {
      success: true,
      data: { createdCount: notifications.length, notifications },
      message: `${notifications.length}개의 지연 알림이 생성되었습니다`,
    };
  });
}
