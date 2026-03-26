/**
 * Eval Dashboard API Routes
 * AI 품질 평가 및 모니터링을 위한 관리자 API
 */

import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { loggers } from '../utils/logger';
import { evalService } from '../services/evalService';
import { requireAuth } from '../middleware/requireAuth';

const logger = loggers.ai;

// 스키마 정의
const runTestsSchema = z.object({
  testIds: z.array(z.string()).optional(),
  category: z.enum(['assist', 'extract', 'action_preview']).optional(),
});

const registerBadcaseSchema = z.object({
  requestId: z.string(),
  category: z.enum(['json_invalid', 'hallucination', 'wrong_tool', 'extraction_fail', 'timeout']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string(),
  inputSnapshot: z.record(z.unknown()),
  expectedOutput: z.record(z.unknown()).optional(),
  actualOutput: z.record(z.unknown()).optional(),
});

const updateBadcaseSchema = z.object({
  status: z.enum(['open', 'in_progress', 'fixed', 'wont_fix']),
  rootCauseAnalysis: z.string().optional(),
});

const timeRangeSchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  days: z.number().min(1).max(90).default(7),
});

export async function evalRoutes(fastify: FastifyInstance) {
  // 모든 Eval API는 인증 필요
  fastify.addHook('preHandler', requireAuth);

  /**
   * GET /v1/eval/dashboard
   * 품질 대시보드 메인 데이터
   */
  fastify.get('/dashboard', {
    schema: {
      tags: ['Eval', 'Dashboard'],
      summary: '품질 대시보드 데이터',
      description: '현재 품질 메트릭, Golden Set 결과, Badcase 현황을 조회합니다',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    try {
      const dashboard = await evalService.getDashboardData();

      return reply.send({
        success: true,
        data: dashboard,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      logger.error(err, 'Failed to get dashboard data');
      return reply.status(500).send({
        success: false,
        error: { code: 'DASHBOARD_ERROR', message: 'Failed to load dashboard data' },
      });
    }
  });

  /**
   * GET /v1/eval/metrics
   * 품질 메트릭 조회
   */
  fastify.get('/metrics', {
    schema: {
      tags: ['Eval', 'Metrics'],
      summary: '품질 메트릭 조회',
      description: '시간 범위별 품질 메트릭을 조회합니다',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    const query = timeRangeSchema.parse(request.query);

    const from = query.from
      ? new Date(query.from)
      : new Date(Date.now() - query.days * 24 * 60 * 60 * 1000);
    const to = query.to ? new Date(query.to) : new Date();

    try {
      const metrics = await evalService.collectMetrics({ from, to });

      return reply.send({
        success: true,
        data: metrics,
        range: { from: from.toISOString(), to: to.toISOString() },
      });
    } catch (err) {
      logger.error(err, 'Failed to collect metrics');
      return reply.status(500).send({
        success: false,
        error: { code: 'METRICS_ERROR', message: 'Failed to collect metrics' },
      });
    }
  });

  /**
   * POST /v1/eval/golden-set/run
   * Golden Set 테스트 실행
   */
  fastify.post('/golden-set/run', {
    schema: {
      tags: ['Eval', 'Golden Set'],
      summary: 'Golden Set 테스트 실행',
      description: 'Golden Set 품질 테스트를 실행합니다. 특정 테스트 ID나 카테고리로 필터링 가능합니다.',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    const data = runTestsSchema.parse(request.body);

    try {
      const results = await evalService.runGoldenSetTests(data.testIds);

      // 카테고리 필터링
      const filteredResults = data.category
        ? results.filter(r => r.category === data.category)
        : results;

      const summary = {
        total: filteredResults.length,
        passed: filteredResults.filter(r => r.passed).length,
        failed: filteredResults.filter(r => !r.passed).length,
        avgScore: filteredResults.reduce((acc, r) => acc + r.score, 0) / filteredResults.length,
        avgLatencyMs: filteredResults.reduce((acc, r) => acc + r.latencyMs, 0) / filteredResults.length,
      };

      logger.info({ summary, category: data.category }, 'Golden set tests completed');

      return reply.status(201).send({
        success: true,
        data: {
          results: filteredResults,
          summary,
        },
      });
    } catch (err) {
      logger.error(err, 'Golden set test execution failed');
      return reply.status(500).send({
        success: false,
        error: { code: 'TEST_ERROR', message: 'Failed to run golden set tests' },
      });
    }
  });

  /**
   * GET /v1/eval/golden-set/results
   * Golden Set 테스트 결과 조회
   */
  fastify.get('/golden-set/results', {
    schema: {
      tags: ['Eval', 'Golden Set'],
      summary: 'Golden Set 결과 조회',
      description: '최근 Golden Set 테스트 결과를 조회합니다',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    const query = z.object({
      category: z.enum(['assist', 'extract', 'action_preview']).optional(),
      passed: z.boolean().optional(),
      limit: z.number().min(1).max(100).default(50),
    }).parse(request.query);

    // 실제 구현에서는 DB에서 조회
    // 현재는 메모리 저장소 사용
    const { evalService } = await import('../services/evalService');
    const allResults = await evalService.runGoldenSetTests(); // 샘플 데이터

    let results = allResults;
    if (query.category) {
      results = results.filter(r => r.category === query.category);
    }
    if (query.passed !== undefined) {
      results = results.filter(r => r.passed === query.passed);
    }

    results = results.slice(0, query.limit);

    return reply.send({
      success: true,
      data: results,
    });
  });

  /**
   * POST /v1/eval/badcases
   * Badcase 등록
   */
  fastify.post('/badcases', {
    schema: {
      tags: ['Eval', 'Badcase'],
      summary: 'Badcase 등록',
      description: '새로운 품질 이슈(Badcase)를 등록합니다',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    const data = registerBadcaseSchema.parse(request.body);

    try {
      const badcase = await evalService.registerBadcase({
        ...data,
        fixStatus: 'open',
      });

      return reply.status(201).send({
        success: true,
        data: badcase,
      });
    } catch (err) {
      logger.error(err, 'Failed to register badcase');
      return reply.status(500).send({
        success: false,
        error: { code: 'BADCASE_ERROR', message: 'Failed to register badcase' },
      });
    }
  });

  /**
   * GET /v1/eval/badcases
   * Badcase 목록 조회
   */
  fastify.get('/badcases', {
    schema: {
      tags: ['Eval', 'Badcase'],
      summary: 'Badcase 목록',
      description: '품질 이슈 목록을 필터링하여 조회합니다',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    const query = z.object({
      category: z.enum(['json_invalid', 'hallucination', 'wrong_tool', 'extraction_fail', 'timeout']).optional(),
      severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
      status: z.enum(['open', 'in_progress', 'fixed', 'wont_fix']).optional(),
      limit: z.number().min(1).max(100).default(50),
    }).parse(request.query);

    try {
      const badcases = await evalService.getBadcases({
        category: query.category,
        severity: query.severity,
        status: query.status,
        limit: query.limit,
      });

      return reply.send({
        success: true,
        data: badcases,
        summary: {
          total: badcases.length,
          byCategory: badcases.reduce((acc, b) => {
            acc[b.category] = (acc[b.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        },
      });
    } catch (err) {
      logger.error(err, 'Failed to get badcases');
      return reply.status(500).send({
        success: false,
        error: { code: 'BADCASE_ERROR', message: 'Failed to get badcases' },
      });
    }
  });

  /**
   * PATCH /v1/eval/badcases/:id
   * Badcase 상태 업데이트
   */
  fastify.patch('/badcases/:id', {
    schema: {
      tags: ['Eval', 'Badcase'],
      summary: 'Badcase 상태 업데이트',
      description: 'Badcase의 상태와 분석 결과를 업데이트합니다',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = updateBadcaseSchema.parse(request.body);

    try {
      const updated = await evalService.updateBadcaseStatus(
        id,
        data.status,
        data.rootCauseAnalysis
      );

      if (!updated) {
        return reply.status(404).send({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Badcase not found' },
        });
      }

      return reply.send({
        success: true,
        data: updated,
      });
    } catch (err) {
      logger.error({ err, id }, 'Failed to update badcase');
      return reply.status(500).send({
        success: false,
        error: { code: 'UPDATE_ERROR', message: 'Failed to update badcase' },
      });
    }
  });

  /**
   * GET /v1/eval/alarms
   * 품질 알람 조회
   */
  fastify.get('/alarms', {
    schema: {
      tags: ['Eval', 'Monitoring'],
      summary: '품질 알람 조회',
      description: '현재 활성화된 품질 알람을 조회합니다',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    try {
      const alarms = await evalService.checkQualityAlarms();

      return reply.send({
        success: true,
        data: {
          alarms,
          hasCritical: alarms.some(a => a.severity === 'critical'),
          hasWarning: alarms.some(a => a.severity === 'warning'),
        },
      });
    } catch (err) {
      logger.error(err, 'Failed to check alarms');
      return reply.status(500).send({
        success: false,
        error: { code: 'ALARM_ERROR', message: 'Failed to check alarms' },
      });
    }
  });

  /**
   * GET /v1/eval/model-comparison
   * 모델 성능 비교
   */
  fastify.get('/model-comparison', {
    schema: {
      tags: ['Eval', 'Analytics'],
      summary: '모델 성능 비교',
      description: 'Kimi vs Claude 모델 성능을 비교합니다',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    const query = timeRangeSchema.parse(request.query);

    const from = query.from
      ? new Date(query.from)
      : new Date(Date.now() - query.days * 24 * 60 * 60 * 1000);
    const to = query.to ? new Date(query.to) : new Date();

    try {
      const comparison = await evalService.compareModelPerformance({ from, to });

      return reply.send({
        success: true,
        data: comparison,
        range: { from: from.toISOString(), to: to.toISOString() },
      });
    } catch (err) {
      logger.error(err, 'Failed to compare model performance');
      return reply.status(500).send({
        success: false,
        error: { code: 'COMPARISON_ERROR', message: 'Failed to compare models' },
      });
    }
  });

  /**
   * GET /v1/eval/coverage
   * 테스트 커버리지 리포트
   */
  fastify.get('/coverage', {
    schema: {
      tags: ['Eval', 'Testing'],
      summary: '테스트 커버리지 리포트',
      description: 'Golden Set 테스트 커버리지를 조회합니다',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    try {
      const report = await evalService.getTestCoverageReport();

      return reply.send({
        success: true,
        data: report,
      });
    } catch (err) {
      logger.error(err, 'Failed to get coverage report');
      return reply.status(500).send({
        success: false,
        error: { code: 'COVERAGE_ERROR', message: 'Failed to get coverage report' },
      });
    }
  });

  /**
   * GET /v1/eval/health
   * Eval 서비스 헬스체크
   */
  fastify.get('/health', {
    schema: {
      tags: ['Eval', 'System'],
      summary: 'Eval 서비스 헬스체크',
    },
  }, async () => {
    return {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  });
}
