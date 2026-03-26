import { FastifyInstance } from 'fastify';
import { extractRoutes } from './extract';
import { recipientRoutes } from './recipients';
import { careRoutes } from './care';
import { mobileRoutes } from './mobile';
import { publicDataRoutes } from './publicData';
import { aiRoutes } from './ai';
import { authRoutes } from './auth';
import { notificationRoutes } from './notifications';
import { evalRoutes } from './eval';

export async function apiRoutes(fastify: FastifyInstance) {
  // 인증/세션
  await fastify.register(authRoutes, { prefix: '/auth' });

  // 문서 추출 (Extract)
  await fastify.register(extractRoutes, { prefix: '/extract' });

  // 수급자 관리
  await fastify.register(recipientRoutes, { prefix: '/recipients' });

  // 케어 기록/상담
  await fastify.register(careRoutes, { prefix: '/care' });

  // 모바일 엔트리
  await fastify.register(mobileRoutes, { prefix: '/mobile' });

  // 공공데이터 연동
  await fastify.register(publicDataRoutes, { prefix: '/public-data' });

  // AI 서비스
  await fastify.register(aiRoutes, { prefix: '/ai' });

  // 알림 서비스
  await fastify.register(notificationRoutes, { prefix: '/notifications' });

  // Eval Dashboard (품질 평가)
  await fastify.register(evalRoutes, { prefix: '/eval' });
}
