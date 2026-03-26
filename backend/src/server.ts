import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import { healthRoutes } from './routes/health';
import { apiRoutes } from './routes/api';
import emrRoutes from './routes/emr';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

dotenv.config();

function isTrustedOrigin(origin: string) {
  try {
    const { hostname } = new URL(origin);

    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname === 'lider.ai' ||
      hostname.endsWith('.lider.ai') ||
      hostname.endsWith('.workers.dev') ||
      hostname === 'yoyang-radar.kr' ||
      hostname.endsWith('.yoyang-radar.kr')
    );
  } catch {
    return false;
  }
}

function getAllowedOrigins() {
  const configuredOrigins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  const origins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4173',
    'http://127.0.0.1:4173',
    'http://localhost:4174',
    'http://127.0.0.1:4174',
    'https://yoyang-radar.kr',
    'https://admin.yoyang-radar.kr',
    ...configuredOrigins,
  ];

  return Array.from(new Set(origins));
}

const app = fastify({
  logger: logger as any,
  trustProxy: true,
});

// 에러 핸들러 등록
app.setErrorHandler(errorHandler);

// 플러그인 등록
async function registerPlugins() {
  const allowedOrigins = getAllowedOrigins();

  // CORS
  await app.register(cors, {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || isTrustedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed: ${origin}`), false);
    },
    credentials: true,
  });

  // JWT
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'fallback-secret',
    sign: {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
  });

  // Multipart uploads
  await app.register(multipart, {
    limits: {
      fileSize: 20 * 1024 * 1024,
      files: 1,
    },
  });

  // Swagger 문서화
  await app.register(swagger, {
    openapi: {
      info: {
        title: '요양레이다 API',
        description: '요양/재가복지센터 통합 관리 플랫폼 API',
        version: '1.0.0',
        contact: {
          name: '요양레이다 팀',
          email: 'support@yoyang-radar.kr',
        },
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Local development',
        },
        {
          url: 'https://api.yoyang-radar.kr',
          description: 'Production',
        },
      ],
      tags: [
        { name: 'Auth', description: '인증/세션 관련 엔드포인트' },
        { name: 'Health', description: 'Health check endpoints' },
        { name: 'Extract', description: '문서 추출 (평가서/진단서)' },
        { name: 'Care', description: '수급자/어르신 관리' },
        { name: 'Mobile', description: '현장 기록 (Mobile Entry)' },
        { name: 'PublicData', description: '공공데이터포털 연동' },
        { name: 'AI', description: 'Kimi AI 통합' },
        { name: 'EMR', description: '병원 EMR 연동 (FHIR/HL7)' },
        { name: 'LongTermCare', description: '장기요양 특화 기능' },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  });
}

// 라우트 등록
async function registerRoutes() {
  await app.register(healthRoutes, { prefix: '/v1/health' });
  await app.register(apiRoutes, { prefix: '/v1' });
  await app.register(emrRoutes, { prefix: '/v1/emr' });
}

// 서버 시작
async function start() {
  try {
    await registerPlugins();
    await registerRoutes();

    const port = parseInt(process.env.PORT || '3001', 10);
    const host = process.env.HOST || '0.0.0.0';

    await app.listen({ port, host });
    
    app.log.info(`🚀 요양레이다 서버 시작됨: http://${host}:${port}`);
    app.log.info(`📚 API 문서: http://${host}:${port}/documentation`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();

export { app };
