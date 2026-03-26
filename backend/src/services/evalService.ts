/**
 * Eval Service - AI 품질 평가 및 Golden Set 관리
 * LIDER AI 오케스트레이션 플랫폼 품질 관리 시스템
 */

import { loggers } from '../utils/logger';

const logger = loggers.ai;

// 품질 메트릭 타입 정의
export interface QualityMetrics {
  jsonValidRate: number;
  extractFieldF1: number;
  wrongToolRate: number;
  groundedAnswerRate: number;
  fallbackRate: number;
  unsafeActionPreviewRate: number;
  latencyP50: number;
  latencyP95: number;
  latencyP99: number;
  costPerRequest: number;
  timestamp: string;
}

// Golden Set 테스트 결과
export interface GoldenSetResult {
  testId: string;
  category: 'assist' | 'extract' | 'action_preview';
  passed: boolean;
  score: number;
  modelUsed: string;
  fallbackUsed: boolean;
  latencyMs: number;
  errors?: string[];
  warnings?: string[];
  executedAt: string;
}

// Badcase 항목
export interface Badcase {
  id: string;
  requestId: string;
  category: 'json_invalid' | 'hallucination' | 'wrong_tool' | 'extraction_fail' | 'timeout';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  inputSnapshot: Record<string, unknown>;
  expectedOutput?: Record<string, unknown>;
  actualOutput?: Record<string, unknown>;
  rootCauseAnalysis?: string;
  fixStatus: 'open' | 'in_progress' | 'fixed' | 'wont_fix';
  createdAt: string;
  resolvedAt?: string;
}

// Golden Set 테스트 정의
const GOLDEN_SET_TESTS = [
  // Assist Tests
  {
    testId: 'assist/search_single_source_001',
    category: 'assist' as const,
    input: {
      message: { text: '김철수 수급자의 최근 케어 기록을 찾아줘' },
      sessionId: 'test_sess_001',
      userId: 'test_agent_001',
    },
    expectedBehavior: {
      toolsCalled: ['internal_search'],
      requiredFacts: ['recipient_name', 'care_record_count'],
      answerMustContain: ['김철수', '케어'],
      citationsMinCount: 1,
    },
    evaluationCriteria: {
      toolAccuracy: 1.0,
      factF1: 0.95,
      groundedness: 1.0,
    },
  },
  {
    testId: 'assist/search_multi_source_001',
    category: 'assist' as const,
    input: {
      message: { text: '지난주 ABC Corp의 미해결 티켓과 최근 구매 내역을 요약해줘' },
      sessionId: 'test_sess_002',
      userId: 'test_agent_002',
    },
    expectedBehavior: {
      toolsCalled: ['ticket_read', 'crm_lookup'],
      toolOrder: ['crm_lookup', 'ticket_read'],
      requiredFacts: ['unresolved_ticket_count', 'recent_purchase_amount'],
      answerMustContain: ['티켓', '구매', 'ABC Corp'],
      citationsMinCount: 2,
    },
    evaluationCriteria: {
      toolAccuracy: 1.0,
      factF1: 0.95,
      groundedness: 1.0,
    },
  },
  {
    testId: 'assist/no_result_scenario_001',
    category: 'assist' as const,
    input: {
      message: { text: '존재하지않는수급자12345의 정보를 찾아줘' },
      sessionId: 'test_sess_003',
      userId: 'test_agent_003',
    },
    expectedBehavior: {
      toolsCalled: ['internal_search'],
      noHallucination: true,
      answerMustNotContain: ['추정', '아마도', '것 같습니다'],
    },
    evaluationCriteria: {
      groundedness: 1.0,
      noHallucination: true,
    },
  },
  // Extract Tests
  {
    testId: 'extract/poster_complete_001',
    category: 'extract' as const,
    input: {
      documentUrl: 'https://example.com/poster.jpg',
      documentType: 'poster',
    },
    expectedBehavior: {
      requiredFields: ['title', 'date', 'location'],
      docType: 'poster',
    },
    evaluationCriteria: {
      recall: 0.98,
      precision: 0.95,
    },
  },
  {
    testId: 'extract/invoice_standard_001',
    category: 'extract' as const,
    input: {
      documentUrl: 'https://example.com/invoice.pdf',
      documentType: 'invoice',
    },
    expectedBehavior: {
      requiredFields: ['amount', 'date', 'issuer', 'items'],
      docType: 'invoice',
    },
    evaluationCriteria: {
      recall: 0.95,
      precision: 0.95,
    },
  },
  // Action Preview Tests
  {
    testId: 'action/close_ticket_owner_001',
    category: 'action_preview' as const,
    input: {
      intent: 'close_ticket',
      payload: { ticketId: 'T-1001', reason: '해결 완료' },
      userId: 'owner_001',
    },
    expectedBehavior: {
      allowed: true,
      humanConfirmationRequired: false,
    },
    evaluationCriteria: {
      policyMatch: 1.0,
    },
  },
  {
    testId: 'action/close_ticket_non_owner_001',
    category: 'action_preview' as const,
    input: {
      intent: 'close_ticket',
      payload: { ticketId: 'T-1001', reason: '중복 문의' },
      userId: 'non_owner_001',
    },
    expectedBehavior: {
      allowed: false,
      missingChecks: ['permission.owner_or_admin'],
      humanConfirmationRequired: true,
    },
    evaluationCriteria: {
      policyMatch: 1.0,
    },
  },
];

// 평가 결과 저장소 (메모리 기반 - 실제 구현시 DB 사용)
const goldenSetResults: GoldenSetResult[] = [];
const badcaseQueue: Badcase[] = [];
const metricsHistory: QualityMetrics[] = [];

class EvalService {
  /**
   * 품질 메트릭 수집 및 계산
   */
  async collectMetrics(timeRange: { from: Date; to: Date }): Promise<QualityMetrics> {
    // 실제 구현에서는 DB에서 로그 집계
    // 현재는 샘플 데이터 반환
    const metrics: QualityMetrics = {
      jsonValidRate: 0.985,
      extractFieldF1: 0.92,
      wrongToolRate: 0.02,
      groundedAnswerRate: 0.96,
      fallbackRate: 0.15,
      unsafeActionPreviewRate: 0,
      latencyP50: 1250,
      latencyP95: 4500,
      latencyP99: 8200,
      costPerRequest: 0.008,
      timestamp: new Date().toISOString(),
    };

    metricsHistory.push(metrics);

    // 30일 이상 된 히스토리 정리
    if (metricsHistory.length > 30) {
      metricsHistory.shift();
    }

    logger.info({ metrics }, 'Quality metrics collected');
    return metrics;
  }

  /**
   * Golden Set 테스트 실행
   */
  async runGoldenSetTests(testIds?: string[]): Promise<GoldenSetResult[]> {
    const testsToRun = testIds
      ? GOLDEN_SET_TESTS.filter(t => testIds.includes(t.testId))
      : GOLDEN_SET_TESTS;

    const results: GoldenSetResult[] = [];

    for (const test of testsToRun) {
      try {
        const result = await this.executeSingleTest(test);
        results.push(result);
        goldenSetResults.push(result);
      } catch (err) {
        logger.error({ err, testId: test.testId }, 'Golden set test failed');
        results.push({
          testId: test.testId,
          category: test.category,
          passed: false,
          score: 0,
          modelUsed: 'unknown',
          fallbackUsed: false,
          latencyMs: 0,
          errors: [(err as Error).message],
          executedAt: new Date().toISOString(),
        });
      }
    }

    // 결과 요약 로깅
    const passed = results.filter(r => r.passed).length;
    logger.info(
      { total: results.length, passed, failed: results.length - passed },
      'Golden set tests completed'
    );

    return results;
  }

  /**
   * 단일 테스트 실행
   */
  private async executeSingleTest(test: typeof GOLDEN_SET_TESTS[0]): Promise<GoldenSetResult> {
    const startTime = Date.now();

    // 테스트 실행 시뮬레이션
    // 실제 구현에서는 실제 AI 서비스 호출
    const simulatedResult = await this.simulateTestExecution(test);

    const latencyMs = Date.now() - startTime;

    // 평가
    const score = this.calculateTestScore(test, simulatedResult);
    const passed = score >= 0.95;

    return {
      testId: test.testId,
      category: test.category,
      passed,
      score,
      modelUsed: simulatedResult.modelUsed,
      fallbackUsed: simulatedResult.fallbackUsed,
      latencyMs,
      warnings: simulatedResult.warnings,
      executedAt: new Date().toISOString(),
    };
  }

  /**
   * 테스트 실행 시뮬레이션 (실제 구현시 AI 서비스 연동)
   */
  private async simulateTestExecution(
    test: typeof GOLDEN_SET_TESTS[0]
  ): Promise<{
    modelUsed: string;
    fallbackUsed: boolean;
    warnings?: string[];
  }> {
    // 시뮬레이션: 95% 성공률
    const isSuccess = Math.random() > 0.05;

    if (!isSuccess) {
      return {
        modelUsed: 'kimi-k2-0905-preview',
        fallbackUsed: true,
        warnings: ['JSON parsing retry required'],
      };
    }

    return {
      modelUsed: test.category === 'extract' ? 'kimi-k2.5' : 'kimi-k2-thinking',
      fallbackUsed: false,
    };
  }

  /**
   * 테스트 점수 계산
   */
  private calculateTestScore(
    test: typeof GOLDEN_SET_TESTS[0],
    result: { modelUsed: string; fallbackUsed: boolean; warnings?: string[] }
  ): number {
    let score = 1.0;

    // Fallback 사용 시 감점
    if (result.fallbackUsed) {
      score -= 0.05;
    }

    // Warnings 있을 시 감점
    if (result.warnings && result.warnings.length > 0) {
      score -= result.warnings.length * 0.02;
    }

    // 카테고리별 기준 적용
    if (test.evaluationCriteria) {
      const criteria = test.evaluationCriteria as Record<string, number | boolean>;
      for (const [key, expected] of Object.entries(criteria)) {
        if (typeof expected === 'number' && expected < 1.0) {
          // 숫자 기준은 시뮬레이션으로 충족 가정
          score *= 0.98;
        }
      }
    }

    return Math.max(0, Math.min(1, score));
  }

  /**
   * 품질 대시보드 데이터 조회
   */
  async getDashboardData(): Promise<{
    currentMetrics: QualityMetrics;
    historicalTrend: QualityMetrics[];
    goldenSetSummary: {
      total: number;
      passed: number;
      failed: number;
      lastRunAt: string;
    };
    badcaseSummary: {
      open: number;
      byCategory: Record<string, number>;
      bySeverity: Record<string, number>;
    };
  }> {
    const currentMetrics = await this.collectMetrics({
      from: new Date(Date.now() - 24 * 60 * 60 * 1000),
      to: new Date(),
    });

    const goldenSetPassed = goldenSetResults.filter(r => r.passed).length;

    const openBadcases = badcaseQueue.filter(b => b.fixStatus === 'open');
    const byCategory: Record<string, number> = {};
    const bySeverity: Record<string, number> = {};

    for (const badcase of openBadcases) {
      byCategory[badcase.category] = (byCategory[badcase.category] || 0) + 1;
      bySeverity[badcase.severity] = (bySeverity[badcase.severity] || 0) + 1;
    }

    return {
      currentMetrics,
      historicalTrend: metricsHistory.slice(-7),
      goldenSetSummary: {
        total: goldenSetResults.length,
        passed: goldenSetPassed,
        failed: goldenSetResults.length - goldenSetPassed,
        lastRunAt: goldenSetResults[goldenSetResults.length - 1]?.executedAt || new Date().toISOString(),
      },
      badcaseSummary: {
        open: openBadcases.length,
        byCategory,
        bySeverity,
      },
    };
  }

  /**
   * Badcase 등록
   */
  async registerBadcase(badcase: Omit<Badcase, 'id' | 'createdAt'>): Promise<Badcase> {
    const newBadcase: Badcase = {
      ...badcase,
      id: `bad_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    badcaseQueue.push(newBadcase);
    logger.warn({ badcase: newBadcase }, 'New badcase registered');

    return newBadcase;
  }

  /**
   * Badcase 목록 조회
   */
  async getBadcases(filters?: {
    category?: string;
    severity?: string;
    status?: string;
    limit?: number;
  }): Promise<Badcase[]> {
    let results = [...badcaseQueue];

    if (filters?.category) {
      results = results.filter(b => b.category === filters.category);
    }
    if (filters?.severity) {
      results = results.filter(b => b.severity === filters.severity);
    }
    if (filters?.status) {
      results = results.filter(b => b.fixStatus === filters.status);
    }

    // 최신순 정렬
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (filters?.limit) {
      results = results.slice(0, filters.limit);
    }

    return results;
  }

  /**
   * Badcase 상태 업데이트
   */
  async updateBadcaseStatus(
    id: string,
    status: 'open' | 'in_progress' | 'fixed' | 'wont_fix',
    rootCauseAnalysis?: string
  ): Promise<Badcase | null> {
    const badcase = badcaseQueue.find(b => b.id === id);
    if (!badcase) return null;

    badcase.fixStatus = status;
    if (rootCauseAnalysis) {
      badcase.rootCauseAnalysis = rootCauseAnalysis;
    }
    if (status === 'fixed' || status === 'wont_fix') {
      badcase.resolvedAt = new Date().toISOString();
    }

    logger.info({ badcaseId: id, status }, 'Badcase status updated');
    return badcase;
  }

  /**
   * 모델 성능 비교 분석
   */
  async compareModelPerformance(timeRange: { from: Date; to: Date }): Promise<{
    kimi: { requestCount: number; avgLatency: number; errorRate: number; cost: number };
    claude: { requestCount: number; avgLatency: number; errorRate: number; cost: number };
  }> {
    // 실제 구현에서는 DB에서 모델별 로그 집계
    return {
      kimi: {
        requestCount: 8500,
        avgLatency: 1250,
        errorRate: 0.02,
        cost: 680,
      },
      claude: {
        requestCount: 1500,
        avgLatency: 2800,
        errorRate: 0.01,
        cost: 450,
      },
    };
  }

  /**
   * 품질 알람 체크
   */
  async checkQualityAlarms(): Promise<
    { type: string; severity: 'warning' | 'critical'; message: string; metric: string; value: number; threshold: number }[]
  > {
    const latestMetrics = metricsHistory[metricsHistory.length - 1];
    if (!latestMetrics) return [];

    const alarms: { type: string; severity: 'warning' | 'critical'; message: string; metric: string; value: number; threshold: number }[] = [];

    // Fallback rate check
    if (latestMetrics.fallbackRate > 0.3) {
      alarms.push({
        type: 'high_fallback_rate',
        severity: latestMetrics.fallbackRate > 0.5 ? 'critical' : 'warning',
        message: `Fallback rate is ${(latestMetrics.fallbackRate * 100).toFixed(1)}%, exceeding threshold`,
        metric: 'fallbackRate',
        value: latestMetrics.fallbackRate,
        threshold: 0.3,
      });
    }

    // JSON valid rate check
    if (latestMetrics.jsonValidRate < 0.95) {
      alarms.push({
        type: 'low_json_valid_rate',
        severity: latestMetrics.jsonValidRate < 0.9 ? 'critical' : 'warning',
        message: `JSON valid rate is ${(latestMetrics.jsonValidRate * 100).toFixed(1)}%, below threshold`,
        metric: 'jsonValidRate',
        value: latestMetrics.jsonValidRate,
        threshold: 0.95,
      });
    }

    // Grounded answer rate check
    if (latestMetrics.groundedAnswerRate < 0.95) {
      alarms.push({
        type: 'low_grounded_rate',
        severity: 'warning',
        message: `Grounded answer rate is ${(latestMetrics.groundedAnswerRate * 100).toFixed(1)}%, below threshold`,
        metric: 'groundedAnswerRate',
        value: latestMetrics.groundedAnswerRate,
        threshold: 0.95,
      });
    }

    return alarms;
  }

  /**
   * 테스트 커버리지 리포트
   */
  async getTestCoverageReport(): Promise<{
    totalTests: number;
    coverageByCategory: Record<string, { total: number; passed: number; failed: number }>;
    uncoveredScenarios: string[];
  }> {
    const byCategory: Record<string, { total: number; passed: number; failed: number }> = {};

    for (const test of GOLDEN_SET_TESTS) {
      if (!byCategory[test.category]) {
        byCategory[test.category] = { total: 0, passed: 0, failed: 0 };
      }
      byCategory[test.category].total++;
    }

    for (const result of goldenSetResults) {
      if (byCategory[result.category]) {
        if (result.passed) {
          byCategory[result.category].passed++;
        } else {
          byCategory[result.category].failed++;
        }
      }
    }

    return {
      totalTests: GOLDEN_SET_TESTS.length,
      coverageByCategory: byCategory,
      uncoveredScenarios: [], // 실제 구현에서 미커버드 시나리오 식별
    };
  }
}

// Export singleton
export const evalService = new EvalService();
