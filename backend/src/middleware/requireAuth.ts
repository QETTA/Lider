import { FastifyReply, FastifyRequest } from 'fastify';

export async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: '로그인이 필요합니다.',
      },
      requestId: request.id,
    });
  }
}
