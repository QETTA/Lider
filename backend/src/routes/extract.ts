import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import mime from 'mime-types';
import { z } from 'zod';
import { requireAuth } from '../middleware/requireAuth';
import { loggers } from '../utils/logger';
import { extractService } from '../services/extractService';

const logger = loggers.extract;
const prisma = new PrismaClient();

// 문서 업로드 스키마
const uploadSchema = z.object({
  recipientId: z.string().uuid().optional(),
  type: z.enum(['EVAL_FORM', 'DOCTOR_NOTE', 'DIAGNOSIS', 'CONTRACT', 'CARE_PLAN', 'GENERAL']),
});

// 문서 분석 요청 스키마
const analyzeSchema = z.object({
  documentId: z.string().uuid(),
  extractFields: z.array(z.string()).optional(),
});

function resolveUploadDirectory() {
  return process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'uploads');
}

function sanitizeFileStem(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'document';
}

function buildStoredFileName(filename: string, mimetype?: string) {
  const originalExtension = path.extname(filename);
  const normalizedExtension = originalExtension || (mime.extension(mimetype || '') ? `.${mime.extension(mimetype || '')}` : '');
  const baseName = path.basename(filename, originalExtension || undefined);
  return `${Date.now()}-${randomUUID()}-${sanitizeFileStem(baseName)}${normalizedExtension.toLowerCase()}`;
}

export async function extractRoutes(fastify: FastifyInstance) {
  // 문서 업로드
  fastify.post('/upload', {
    schema: {
      tags: ['Extract'],
      summary: '문서 업로드',
      description: '평가서, 진단서 등 문서를 업로드합니다',
      consumes: ['multipart/form-data'],
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    try {
      const parts = request.parts();
      const fieldValues: Record<string, string> = {};
      let filePart: Awaited<ReturnType<typeof request.file>> | null = null;

      for await (const part of parts) {
        if (part.type === 'file') {
          filePart = part;
          continue;
        }

        fieldValues[part.fieldname] = typeof part.value === 'string' ? part.value : String(part.value ?? '');
      }

      if (!filePart) {
        return reply.status(400).send({
          success: false,
          error: { code: 'NO_FILE', message: '업로드된 파일이 없습니다' },
        });
      }

      const payload = uploadSchema.parse(fieldValues);
      const buffer = await filePart.toBuffer();
      const uploadDirectory = resolveUploadDirectory();
      const storedFileName = buildStoredFileName(filePart.filename || 'upload', filePart.mimetype);
      const storedFilePath = path.join(uploadDirectory, storedFileName);
      const fileUrl = `/uploads/${storedFileName}`;

      await fs.mkdir(uploadDirectory, { recursive: true });
      await fs.writeFile(storedFilePath, buffer);

      try {
        const document = await prisma.document.create({
          data: {
            recipientId: payload.recipientId ?? null,
            uploadedBy: request.user.sub,
            type: payload.type,
            status: 'PENDING',
            fileName: filePart.filename || storedFileName,
            fileUrl,
            fileSize: buffer.byteLength,
            mimeType: filePart.mimetype || mime.lookup(filePart.filename || '') || 'application/octet-stream',
          },
        });

        logger.info(
          {
            documentId: document.id,
            filename: document.fileName,
            mimetype: document.mimeType,
            uploadedBy: request.user.sub,
          },
          'Document uploaded'
        );

        return reply.status(201).send({
          success: true,
          data: {
            documentId: document.id,
            fileUrl: document.fileUrl,
            status: document.status,
          },
        });
      } catch (err) {
        await fs.unlink(storedFilePath).catch(() => undefined);
        throw err;
      }
    } catch (err) {
      logger.error(err, 'Upload failed');
      throw err;
    }
  });

  // 문서 분석 (AI 추출)
  fastify.post('/analyze', {
    schema: {
      tags: ['Extract'],
      summary: '문서 AI 분석',
      description: 'Kimi AI를 사용하여 문서에서 필드를 추출합니다',
    },
    preHandler: requireAuth,
  }, async (request, reply) => {
    const body = analyzeSchema.parse(request.body);
    
    logger.info({ documentId: body.documentId }, 'Starting document analysis');

    try {
      // TODO: 문서 조회 및 AI 추출
      const result = await extractService.analyzeDocument(body.documentId, body.extractFields);

      return reply.send({
        success: true,
        data: result,
      });
    } catch (err) {
      logger.error({ err, documentId: body.documentId }, 'Analysis failed');
      throw err;
    }
  });

  // 문서 목록 조회
  fastify.get('/documents', {
    schema: {
      tags: ['Extract'],
      summary: '문서 목록 조회',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { recipientId, status, type } = request.query as any;

    const documents = await prisma.document.findMany({
      where: {
        ...(recipientId && { recipientId }),
        ...(status && { status }),
        ...(type && { type }),
      },
      include: {
        recipient: {
          select: { name: true, longTermCareId: true },
        },
        uploader: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: documents,
    };
  });

  // 문서 상세 조회
  fastify.get('/documents/:id', {
    schema: {
      tags: ['Extract'],
      summary: '문서 상세 조회',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { id } = request.params as { id: string };

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        recipient: true,
        uploader: { select: { name: true, email: true } },
      },
    });

    if (!document) {
      throw { statusCode: 404, message: '문서를 찾을 수 없습니다' };
    }

    return {
      success: true,
      data: document,
    };
  });

  // 누락 문서 체크리스트
  fastify.get('/completeness/:recipientId', {
    schema: {
      tags: ['Extract'],
      summary: '평가 문서 완전성 체크',
      description: '수급자의 평가 문서 누락 여부를 확인합니다',
    },
    preHandler: requireAuth,
  }, async (request) => {
    const { recipientId } = request.params as { recipientId: string };

    const result = await extractService.checkCompleteness(recipientId);

    return {
      success: true,
      data: result,
    };
  });
}
