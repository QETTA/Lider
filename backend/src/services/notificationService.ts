import {
  PrismaClient,
  Notification,
  NotificationType,
  NotificationPriority,
  VisitStatus,
} from '../../prisma/generated/client';
import { createContextLogger } from '../utils/logger';

const logger = createContextLogger('NOTIFICATION');
const prisma = new PrismaClient();

// 알림 생성 데이터 타입 (Prisma 타입 기반)
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

// 채널 발송 상태 타입
type ChannelStatus = 'sent' | 'failed' | 'skipped';

interface ChannelDeliveryResult {
  push: ChannelStatus;
  email: ChannelStatus;
  sms: ChannelStatus;
}

// 알림과 사용자 정보를 함께 조회한 결과 타입
interface NotificationWithUser extends Notification {
  user: {
    email: string | null;
    phone: string | null;
    name: string | null;
  } | null;
}

// 알림 조회 옵션 타입
interface GetNotificationsOptions {
  unreadOnly?: boolean;
  limit?: number;
  offset?: number;
}

// 알림 목록 조회 결과 타입
interface GetNotificationsResult {
  notifications: Notification[];
  unreadCount: number;
  hasMore: boolean;
}

/**
 * 알림 서비스 클래스
 * 멀티채널 알림 발송 및 알림 관리 기능 제공
 */
class NotificationService {
  /**
   * 알림 생성 및 발송
   */
  async createNotification(data: CreateNotificationData): Promise<Notification> {
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

  /**
   * 알림 발송 (멀티채널)
   */
  async sendNotification(notificationId: string): Promise<{ success: true; channels: ChannelDeliveryResult }> {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
      include: { user: { select: { email: true, phone: true, name: true } } },
    }) as NotificationWithUser | null;

    if (!notification) {
      throw new Error(`Notification not found: ${notificationId}`);
    }

    const channels: ChannelDeliveryResult = {
      push: 'skipped',
      email: 'skipped',
      sms: 'skipped',
    };

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
    }

    // 상태 업데이트
    await prisma.notification.update({
      where: { id: notificationId },
      data: { 
        channels: channels as unknown as Record<string, string>,
        sentAt: new Date(),
      },
    });

    logger.info(
      { notificationId, channels },
      'Notification sent to channels'
    );

    return { success: true, channels };
  }

  /**
   * 사용자 알림 목록 조회
   */
  async getUserNotifications(
    userId: string,
    options: GetNotificationsOptions = {}
  ): Promise<GetNotificationsResult> {
    const { unreadOnly, limit = 20, offset = 0 } = options;

    const where = {
      userId,
      ...(unreadOnly ? { isRead: false } : {}),
    };

    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: [{ createdAt: 'desc' }],
        take: limit,
        skip: offset,
      }),
      prisma.notification.count({
        where: { userId, isRead: false },
      }),
    ]);

    return {
      notifications,
      unreadCount,
      hasMore: notifications.length === limit,
    };
  }

  /**
   * 알림 읽음 처리
   */
  async markAsRead(notificationId: string, userId: string): Promise<{ success: true }> {
    const result = await prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { isRead: true, readAt: new Date() },
    });

    if (result.count === 0) {
      throw new Error('Notification not found or not authorized');
    }

    return { success: true };
  }

  /**
   * 모든 알림 읽음 처리
   */
  async markAllAsRead(userId: string): Promise<{ success: true; markedCount: number }> {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });

    const markedCount = await prisma.notification.count({
      where: { userId, isRead: true },
    });

    return { success: true, markedCount };
  }

  /**
   * 알림 삭제
   */
  async deleteNotification(notificationId: string, userId: string): Promise<{ success: true }> {
    await prisma.notification.deleteMany({
      where: { id: notificationId, userId },
    });

    return { success: true };
  }

  /**
   * 방문 예정 알림 생성 (스케줄러에서 호출)
   * 35분 이내 시작 예정 방문에 대한 알림 생성
   */
  async createVisitReminders(): Promise<Notification[]> {
    const now = new Date();
    const reminderWindow = new Date(now.getTime() + 35 * 60 * 1000); // 35분 후

    // 35분 이내에 시작할 방문들 (중복 방지 로직 포함)
    const upcomingVisits = await prisma.visitSchedule.findMany({
      where: {
        scheduledDate: {
          gte: now,
          lte: reminderWindow,
        },
        status: 'SCHEDULED' as VisitStatus,
      },
      include: {
        recipient: { select: { name: true } },
        worker: { select: { id: true, name: true } },
      },
    });

    // 이미 알림이 생성된 방문 필터링 (1시간 내)
    const recentNotifications = await prisma.notification.findMany({
      where: {
        type: 'VISIT_REMINDER' as NotificationType,
        createdAt: { gte: new Date(now.getTime() - 60 * 60 * 1000) },
      },
      select: { relatedEntityId: true },
    });

    const notifiedVisitIds = new Set(recentNotifications.map((n) => n.relatedEntityId));

    const createdNotifications: Notification[] = [];

    for (const visit of upcomingVisits) {
      // 이미 알림이 있는 경우 스킵
      if (notifiedVisitIds.has(visit.id)) continue;
      if (!visit.recipient) continue;

      // 예정 시간까지 남은 분 계산
      const minutesUntilVisit = visit.scheduledTime
        ? Math.max(0, Math.round((new Date(visit.scheduledTime).getTime() - now.getTime()) / 60000))
        : null;

      const notification = await this.createNotification({
        userId: visit.workerId,
        type: 'VISIT_REMINDER',
        title: '방문 예정 알림',
        message: `${visit.recipient.name} 어르신 방문이 ${
          minutesUntilVisit !== null
            ? `약 ${minutesUntilVisit}분 후`
            : '곧'
        } 예정입니다.`,
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

  /**
   * 방문 지연 알림 체크
   * 예정 시간 30분 이상 지난 방문에 대한 알림 생성
   */
  async checkOverdueVisits(): Promise<Notification[]> {
    const now = new Date();
    const overdueThreshold = new Date(now.getTime() - 30 * 60 * 1000); // 30분 지남

    const overdueVisits = await prisma.visitSchedule.findMany({
      where: {
        scheduledDate: { lte: overdueThreshold },
        status: 'SCHEDULED' as VisitStatus,
      },
      include: {
        recipient: { select: { name: true } },
        worker: { select: { id: true, name: true } },
      },
    });

    // 이미 지연 알림이 생성된 방문 필터링 (4시간 내)
    const recentOverdueNotifications = await prisma.notification.findMany({
      where: {
        type: 'VISIT_OVERDUE' as NotificationType,
        createdAt: { gte: new Date(now.getTime() - 4 * 60 * 60 * 1000) },
      },
      select: { relatedEntityId: true },
    });

    const notifiedOverdueIds = new Set(recentOverdueNotifications.map((n) => n.relatedEntityId));

    const notifications: Notification[] = [];

    for (const visit of overdueVisits) {
      // 이미 알림이 있는 경우 스킵
      if (notifiedOverdueIds.has(visit.id)) continue;
      if (!visit.recipient) continue;

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

    logger.info(
      { count: notifications.length },
      'Overdue visit notifications created'
    );

    return notifications;
  }

  // ===== Private: 채널별 발송 구현 (Phase 2에서 고도화) =====

  /**
   * Push 알림 발송 (Firebase Cloud Messaging)
   * Phase 2: FCM 연동 예정
   */
  private async sendPush(notification: NotificationWithUser): Promise<{ success: true }> {
    // TODO: Phase 2 - Firebase Cloud Messaging 연동
    // 1. 사용자 FCM 토큰 조회
    // 2. FCM 메시지 구성
    // 3. FCM 발송 API 호출
    // 4. 발송 결과 로깅 및 실패 시 재시도 큐 등록

    logger.info(
      { 
        notificationId: notification.id, 
        title: notification.title,
        userId: notification.userId,
      },
      '[Placeholder] Push notification would be sent via FCM'
    );

    return { success: true };
  }

  /**
   * Email 알림 발송 (SendGrid/AWS SES)
   * Phase 2: SendGrid 연동 예정
   */
  private async sendEmail(notification: NotificationWithUser): Promise<{ success: true }> {
    // TODO: Phase 2 - SendGrid/AWS SES 연동
    // 1. 이메일 템플릿 렌더링 (Handlebars)
    // 2. 첨부파일 처리 (있는 경우)
    // 3. SendGrid API 호출
    // 4. 발송 결과 로깅

    if (!notification.user?.email) {
      logger.warn({ notificationId: notification.id }, 'No email address for user');
      return { success: true };
    }

    logger.info(
      { 
        notificationId: notification.id, 
        to: notification.user.email,
        priority: notification.priority,
      },
      '[Placeholder] Email notification would be sent via SendGrid'
    );

    return { success: true };
  }

  /**
   * SMS 알림 발송 (Twilio/Naver Cloud)
   * Phase 2: SMS provider 연동 예정
   */
  private async sendSMS(notification: NotificationWithUser): Promise<{ success: true }> {
    // TODO: Phase 2 - Twilio 또는 Naver Cloud SMS 연동
    // 1. 메시지 길이 검증 (90바이트 기준 SMS/LMS 분기)
    // 2. 발신번호 설정
    // 3. SMS API 호출
    // 4. 발송 결과 로깅 및 잔액 체크

    if (!notification.user?.phone) {
      logger.warn({ notificationId: notification.id }, 'No phone number for user');
      return { success: true };
    }

    logger.info(
      { 
        notificationId: notification.id, 
        to: notification.user.phone,
        priority: notification.priority,
      },
      '[Placeholder] SMS notification would be sent via Twilio/Naver'
    );

    return { success: true };
  }
}

// 싱글톤 인스턴스 export
export const notificationService = new NotificationService();
