import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { loggers } from '../utils/logger';

const logger = loggers.server;
const prisma = new PrismaClient();

export async function healthRoutes(fastify: FastifyInstance) {
  // 기본 헬스체크
  fastify.get('/', async () => {
    return {
      success: true,
      data: {
        service: 'yoyang-radar-api',
        version: '1.0.0',
        status: 'healthy',
        scope: 'backend',
        timestamp: new Date().toISOString(),
      },
    };
  });

  // 상세 헬스체크 (DB 연결 포함)
  fastify.get('/detail', async (request, reply) => {
    const checks = {
      database: false,
      timestamp: new Date().toISOString(),
    };

    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.database = true;
    } catch (err) {
      logger.error(err, 'Database health check failed');
    }

    const allHealthy = checks.database;
    const status = allHealthy ? 200 : 503;

    return reply.status(status).send({
      success: allHealthy,
      data: {
        status: allHealthy ? 'healthy' : 'unhealthy',
        scope: 'backend',
        checks,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
      },
    });
  });

  // 레디니스 프로브 (K8s)
  fastify.get('/ready', async (request, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return reply.status(200).send({
        success: true,
        data: { ready: true },
      });
    } catch (err) {
      return reply.status(503).send({
        success: false,
        error: { code: 'NOT_READY', message: 'Service not ready' },
      });
    }
  });

  // 라이브니스 프로브 (K8s)
  fastify.get('/live', async () => ({
    success: true,
    data: { alive: true },
  }));
}
