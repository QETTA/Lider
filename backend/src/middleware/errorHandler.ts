import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { loggers } from '../utils/logger';

const logger = loggers.api;

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId: string;
}

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestId = request.id as string;
  
  // Zod 검증 에러
  if (error instanceof ZodError) {
    const response: ErrorResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '입력 데이터 검증 실패',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
      requestId,
    };
    
    logger.warn({ requestId, errors: error.errors }, 'Validation error');
    return reply.status(400).send(response);
  }

  // JWT 인증 에러
  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
    const response: ErrorResponse = {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: '인증 토큰이 필요합니다',
      },
      requestId,
    };
    
    logger.warn({ requestId }, 'Unauthorized request');
    return reply.status(401).send(response);
  }

  // 기타 Fastify 에러
  if (error.statusCode) {
    const response: ErrorResponse = {
      success: false,
      error: {
        code: error.code || 'HTTP_ERROR',
        message: error.message,
      },
      requestId,
    };
    
    logger.warn({ requestId, statusCode: error.statusCode, message: error.message }, 'HTTP error');
    return reply.status(error.statusCode).send(response);
  }

  // 예상치 못한 서버 에러
  logger.error({ 
    requestId, 
    error: error.message, 
    stack: error.stack,
    url: request.url,
    method: request.method,
  }, 'Unexpected error');

  const response: ErrorResponse = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? '서버 내부 오류가 발생했습니다'
        : error.message,
    },
    requestId,
  };

  return reply.status(500).send(response);
};
