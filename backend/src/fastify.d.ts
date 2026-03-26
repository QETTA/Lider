import '@fastify/jwt';
import { UserRole } from '@prisma/client';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      sub: string;
      email: string;
      name: string;
      role: UserRole;
      centerId: string | null;
    };
    user: {
      sub: string;
      email: string;
      name: string;
      role: UserRole;
      centerId: string | null;
    };
  }
}
