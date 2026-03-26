import { PrismaClient } from '@prisma/client';
import { createContextLogger } from '../utils/logger';

const logger = createContextLogger('NOTIFICATION');
const prisma = new PrismaClient();

// 알림 타입 정의
type NotificationType =
  | 'VISIT_REMINDER'
  | 'VISIT_OVERDUE'
  | 'VISIT_COMPLETED'
  | 'SCHEDULE_CHANGED'
  | 'NEW_DOCUMENT'
  | 'CONSULTATION_DUE'
  | 'EMERGENCY_ALERT'
  | 'SYSTEM_NOTICE';

type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

// 알림 생성 데이터 타입
interface CreateNotificationData {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  priority?: NotificationPriority;
  relatedEntityType?: string;
  relatedEntityId?: string;
  scheduledFor?: Date;
}

// 알림 서비스 클래스
class NotificationService {
  // 알림 생성
  async createNotification(data: CreateNotificationData) {
    const notification = await prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        priority: data.priority || 'NORMAL',
        relatedEntityType: data.relatedEntityType,
        relatedEntityId: data.relatedEntityId,
        scheduledFor: data.scheduledFor,
        channels: {},
      },
    });

    logger.info(
      { notificationId: notification.id, userId: data.userId, type: data.type },
      'Notification created'
    );

    // 즉시 발송이면 채널로 발송
    if (!data.scheduledFor || data.scheduledFor <= new Date()) {
      await this.sendNotification(notification.id);
    }

    return notification;
  }

  // 알림 발송 (멀티채널)
  async sendNotification(notificationId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
      include: { user: { select: { email: true, phone: true, name: true } } },
    });

    if (!notification) {
      throw new Error(`Notification not found: ${notificationId}`);
    }

    const channels: Record<string, 'sent' | 'failed' | 'skipped'> = {};

    // Push 알림 (Web Push / Firebase 등)
    try {
      await this.sendPush(notification);
      channels.push = 'sent';
    } catch (err) {
      logger.error({ err, notificationId }, 'Push notification failed');
      channels.push = 'failed';
    }

    // Email 알림 (고우선순위만)
    if (notification.priority === 'HIGH' || notification.priority === 'URGENT') {
      try {
        await this.sendEmail(notification);
        channels.email = 'sent';
      } catch (err) {
        logger.error({ err, notificationId }, 'Email notification failed');
        channels.email = 'failed';
      }
    } else {
      channels.email = 'skipped';
    }

    // SMS 알림 (긴급만)
    if (notification.priority === 'URGENT') {
      try {
        await this.sendSMS(notification);
        channels.sms = 'sent';
      } catch (err) {
        logger.error({ err, notificationId }, 'SMS notification failed');
        channels.sms = 'failed';
      }
    } else {
      channels.sms = 'skipped';
    }

    // 상태 업데이트
    await prisma.notification.update({
      where: { id: notificationId },
      data: { channels },
    });

    logger.info(
      { notificationId, channels },
      'Notification sent to channels'
    );

    return { success: true, channels };
  }

  // 사용자 알림 목록 조회
  async getUserNotifications(
    userId: string,
    options?: {
      unreadOnly?: boolean;
      limit?: number;
      offset?: number;
    }
  ) {
    const where: any = { userId };

    if (options?.unreadOnly) {
      where.isRead = false;
    }

    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: [{ createdAt: 'desc' }],
        take: options?.limit || 20,
        skip: options?.offset || 0,
      }),
      prisma.notification.count({
        where: { userId, isRead: false },
      }),
    ]);

    return {
      notifications,
      unreadCount,
      hasMore: notifications.length === (options?.limit || 20),
    };
  }

  // 알림 읽음 처리
  async markAsRead(notificationId: string, userId: string) {
    const notification = await prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { isRead: true, readAt: new Date() },
    });

    if (notification.count === 0) {
      throw new Error('Notification not found or not authorized');
    }

    return { success: true };
  }

  // 모든 알림 읽음 처리
  async markAllAsRead(userId: string) {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });

    return {
      success: true,
      markedCount: await prisma.notification.count({
        where: { userId, isRead: true },
      }),
    };
  }

  // 알림 삭제
  async deleteNotification(notificationId: string, userId: string) {
    await prisma.notification.deleteMany({
      where: { id: notificationId, userId },
    });

    return { success: true };
  }

  // 방문 예정 알림 생성 (스케줄러에서 호출)
  async createVisitReminders() {
    const now = new Date();
    const reminderWindow = new Date(now.getTime() + 35 * 60 * 1000); // 35분 후

    // 30분 이내에 시작할 방문들 (중복 방지 로직 개선)
    const upcomingVisits = await prisma.visitSchedule.findMany({
      where: {
        scheduledDate: {
          gte: now,
          lte: reminderWindow,
        },
        status: 'SCHEDULED',
      },
      include: {
        recipient: true,
        worker: { select: { id: true, name: true } },
      },
    });

    // 이미 알림이 생성된 방문 필터링
    const recentNotifications = await prisma.notification.findMany({
      where: {
        type: 'VISIT_REMINDER',
        createdAt: { gte: new Date(now.getTime() - 60 * 60 * 1000) },
      },
      select: { relatedEntityId: true },
    });

    const notifiedVisitIds = new Set(recentNotifications.map((n) => n.relatedEntityId));

    const createdNotifications = [];

    for (const visit of upcomingVisits) {
      // 이미 알림이 있는 경우 스킵
      if (notifiedVisitIds.has(visit.id)) continue;

      const notification = await this.createNotification({
        userId: visit.workerId,
        type: 'VISIT_REMINDER',
        title: '방문 예정 알림',
        message: `${visit.recipient.name} 어르신 방문이 ${visit.scheduledTime
          ? `약 ${Math.round((new Date(visit.scheduledTime).getTime() - now.getTime()) / 60000)}분 후`
          : '곧'} 예정입니다.`,
        priority: 'NORMAL',
        relatedEntityType: 'VisitSchedule',
        relatedEntityId: visit.id,
      });

      createdNotifications.push(notification);
    }

    logger.info(
      { count: createdNotifications.length },
      'Visit reminder notifications created'
    );

    return createdNotifications;
  }

  // 방문 지연 알림 체크
  async checkOverdueVisits() {
    const now = new Date();
    const overdueThreshold = new Date(now.getTime() - 30 * 60 * 1000); // 30분 지남

    const overdueVisits = await prisma.visitSchedule.findMany({
      where: {
        scheduledDate: { lte: overdueThreshold },
        status: 'SCHEDULED',
      },
      include: {
        recipient: true,
        worker: { select: { id: true, name: true } },
      },
    });

    // 이미 지연 알림이 생성된 방문 필터링
    const recentOverdueNotifications = await prisma.notification.findMany({
      where: {
        type: 'VISIT_OVERDUE',
        createdAt: { gte: new Date(now.getTime() - 4 * 60 * 60 * 1000) },
      },
      select: { relatedEntityId: true },
    });

    const notifiedOverdueIds = new Set(recentOverdueNotifications.map((n) => n.relatedEntityId));

    const notifications = [];

    for (const visit of overdueVisits) {
      // 이미 알림이 있는 경우 스킵
      if (notifiedOverdueIds.has(visit.id)) continue;

      // 근무자에게 알림
      const workerNotification = await this.createNotification({
        userId: visit.workerId,
        type: 'VISIT_OVERDUE',
        title: '방문 지연 알림',
        message: `${visit.recipient.name} 어르신 방문이 예정 시간보다 30분 이상 지났습니다.`,
        priority: 'HIGH',
        relatedEntityType: 'VisitSchedule',
        relatedEntityId: visit.id,
      });

      notifications.push(workerNotification);
    }

    return notifications;
  }

  // ===== Private: 채널별 발송 =====

  private async sendPush(notification: any) {
    // TODO: Web Push 또는 Firebase Cloud Messaging 연동
    // 현재는 로깅만
    logger.info(
      { notificationId: notification.id, title: notification.title },
      'Push notification would be sent'
    );
    return { success: true };
  }

  private async sendEmail(notification: any) {
    // TODO: SMTP 또는 SendGrid/AWS SES 연동
    logger.info(
      { notificationId: notification.id, to: notification.user?.email },
      'Email notification would be sent'
    );
    return { success: true };
  }

  private async sendSMS(notification: any) {
    // TODO: Naver Cloud SMS 또는 Twilio 연동
    logger.info(
      { notificationId: notification.id, to: notification.user?.phone },
      'SMS notification would be sent'
    );
    return { success: true };
  }
}

// 싱글톤 인스턴스 export
export const notificationService = new NotificationService();
