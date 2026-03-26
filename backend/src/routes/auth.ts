import bcrypt from 'bcryptjs';
import { PrismaClient, UserOnboardingProfile, UserRole } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { requireAuth } from '../middleware/requireAuth';
import { loggers } from '../utils/logger';

const prisma = new PrismaClient();
const logger = loggers.auth;

const loginSchema = z.object({
  email: z.string().email('이메일 형식을 확인해 주세요.'),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
});

const onboardingStringArraySchema = z.array(z.string().trim().min(1)).max(8);

const onboardingUpdateSchema = z
  .object({
    role: z.string().trim().min(1).max(80).optional(),
    roleContext: z.string().trim().min(1).max(160).optional(),
    centerType: z.string().trim().min(1).max(80).optional(),
    teamSize: z.string().trim().min(1).max(40).optional(),
    onboardingGoals: onboardingStringArraySchema.optional(),
    setupPriorities: onboardingStringArraySchema.optional(),
    communicationChannel: z.string().trim().min(1).max(80).optional(),
    handoverNote: z.string().trim().max(2000).optional(),
    completedAt: z.string().datetime().nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: '저장할 온보딩 정보가 없습니다.',
  });

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  center: null | {
    id: string;
    name: string;
    code: string;
    type: string;
  };
};

type OnboardingProfileResponse = {
  role: string;
  roleContext: string;
  centerType: string;
  teamSize: string;
  onboardingGoals: string[];
  setupPriorities: string[];
  communicationChannel: string;
  handoverNote: string;
  completedAt: string | null;
};

function toSessionUser(user: {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  center: null | {
    id: string;
    name: string;
    code: string;
    type: string;
  };
}): SessionUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    center: user.center
      ? {
          id: user.center.id,
          name: user.center.name,
          code: user.center.code,
          type: user.center.type,
        }
      : null,
  };
}

function toOnboardingProfile(profile?: UserOnboardingProfile | null): OnboardingProfileResponse {
  return {
    role: profile?.role ?? '',
    roleContext: profile?.roleContext ?? '',
    centerType: profile?.centerType ?? '',
    teamSize: profile?.teamSize ?? '',
    onboardingGoals: profile?.onboardingGoals ?? [],
    setupPriorities: profile?.setupPriorities ?? [],
    communicationChannel: profile?.communicationChannel ?? '',
    handoverNote: profile?.handoverNote ?? '',
    completedAt: profile?.completedAt?.toISOString() ?? null,
  };
}

async function findActiveUser(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      center: true,
    },
  });
}

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', {
    schema: {
      tags: ['Auth'],
      summary: '이메일/비밀번호 로그인',
      description: '센터 계정으로 로그인하고 JWT 세션을 발급합니다.',
    },
  }, async (request, reply) => {
    const { email, password } = loginSchema.parse(request.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        center: true,
      },
    });

    if (!existingUser || !existingUser.isActive) {
      logger.warn({ email }, 'Login rejected: user missing or inactive');
      return reply.status(401).send({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        },
      });
    }

    const passwordMatches = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatches) {
      logger.warn({ email, userId: existingUser.id }, 'Login rejected: invalid password');
      return reply.status(401).send({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        },
      });
    }

    const user = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        lastLoginAt: new Date(),
      },
      include: {
        center: true,
      },
    });

    const token = fastify.jwt.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      centerId: user.centerId ?? null,
    });

    logger.info({ userId: user.id, centerId: user.centerId }, 'User login succeeded');

    return reply.status(200).send({
      success: true,
      data: {
        token,
        user: toSessionUser(user),
      },
    });
  });

  fastify.get('/me', {
    schema: {
      tags: ['Auth'],
      summary: '현재 세션 조회',
      description: '현재 JWT 세션의 사용자 정보를 확인합니다.',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const claims = request.user;
    const user = await findActiveUser(claims.sub);

    if (!user || !user.isActive) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'SESSION_INVALID',
          message: '세션이 유효하지 않습니다.',
        },
      });
    }

    return {
      success: true,
      data: {
        user: toSessionUser(user),
      },
    };
  });

  fastify.get('/onboarding', {
    schema: {
      tags: ['Auth'],
      summary: '현재 사용자 온보딩 상태 조회',
      description: '로그인한 사용자 기준으로 온보딩/첫 설정 저장값을 조회합니다.',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const claims = request.user;
    const user = await findActiveUser(claims.sub);

    if (!user || !user.isActive) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'SESSION_INVALID',
          message: '세션이 유효하지 않습니다.',
        },
      });
    }

    const onboarding = await prisma.userOnboardingProfile.findUnique({
      where: { userId: user.id },
    });

    return {
      success: true,
      data: {
        onboarding: toOnboardingProfile(onboarding),
      },
    };
  });

  fastify.put('/onboarding', {
    schema: {
      tags: ['Auth'],
      summary: '현재 사용자 온보딩 상태 저장',
      description: '로그인한 사용자 기준으로 온보딩/첫 설정 저장값을 갱신합니다.',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const claims = request.user;
    const user = await findActiveUser(claims.sub);

    if (!user || !user.isActive) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'SESSION_INVALID',
          message: '세션이 유효하지 않습니다.',
        },
      });
    }

    const payload = onboardingUpdateSchema.parse(request.body);
    const nextData: {
      role?: string;
      roleContext?: string;
      centerType?: string;
      teamSize?: string;
      onboardingGoals?: string[];
      setupPriorities?: string[];
      communicationChannel?: string;
      handoverNote?: string;
      completedAt?: Date | null;
    } = {};

    if (payload.role !== undefined) {
      nextData.role = payload.role;
    }

    if (payload.roleContext !== undefined) {
      nextData.roleContext = payload.roleContext;
    }

    if (payload.centerType !== undefined) {
      nextData.centerType = payload.centerType;
    }

    if (payload.teamSize !== undefined) {
      nextData.teamSize = payload.teamSize;
    }

    if (payload.onboardingGoals !== undefined) {
      nextData.onboardingGoals = payload.onboardingGoals;
    }

    if (payload.setupPriorities !== undefined) {
      nextData.setupPriorities = payload.setupPriorities;
    }

    if (payload.communicationChannel !== undefined) {
      nextData.communicationChannel = payload.communicationChannel;
    }

    if (payload.handoverNote !== undefined) {
      nextData.handoverNote = payload.handoverNote;
    }

    if (payload.completedAt !== undefined) {
      nextData.completedAt = payload.completedAt ? new Date(payload.completedAt) : null;
    }

    const onboarding = await prisma.userOnboardingProfile.upsert({
      where: { userId: user.id },
      update: nextData,
      create: {
        userId: user.id,
        ...nextData,
      },
    });

    return {
      success: true,
      data: {
        onboarding: toOnboardingProfile(onboarding),
      },
    };
  });

  fastify.post('/logout', {
    schema: {
      tags: ['Auth'],
      summary: '로그아웃',
      description: '현재 세션을 종료합니다. 현재 버전은 stateless JWT 기반이라 클라이언트 토큰 폐기가 핵심입니다.',
    },
    preHandler: requireAuth,
  }, async () => {
    return {
      success: true,
      data: {
        loggedOut: true,
      },
    };
  });
}
