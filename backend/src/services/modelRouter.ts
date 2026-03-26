/**
 * Model Router Service
 * LIDER AI Model Routing 및 Fallback 관리
 * 
 * 문서 내 축약형(kimi-k2-0905) → API 호출 시 공식 명칭(kimi-k2-0905-preview) 변환
 */

import axios, { AxiosInstance } from 'axios';
import { loggers } from '../utils/logger';

const logger = loggers.ai;

// 모델 명명 규칙: 문서 내 축약형 ↔ API 공식 명칭
const MODEL_NAME_MAP: Record<string, string> = {
  // 내부 축약형 → API 공식 명칭
  'kimi-k2-0905': 'kimi-k2-0905-preview',
  'kimi-k2-thinking': 'kimi-k2-thinking',
  'kimi-k2.5': 'kimi-k2.5',
  'claude-sonnet-4-6': 'claude-sonnet-4-6',
  // 역방향 매핑
  'kimi-k2-0905-preview': 'kimi-k2-0905-preview',
  'claude-sonnet-4-6': 'claude-sonnet-4-6',
};

// 모델 가격 정보 (input/output per 1M tokens)
const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  'kimi-k2-0905-preview': { input: 0.6, output: 2.5 },
  'kimi-k2-thinking': { input: 0.6, output: 2.5 },
  'kimi-k2.5': { input: 0.6, output: 3.0 },
  'claude-sonnet-4-6': { input: 3.0, output: 15.0 },
};

// 모델 역할 정의
export enum ModelRole {
  DEFAULT = 'default',           // 기본 텍스트 응답, JSON 태깅, 요약
  PLANNER = 'planner',           // 멀티툴 플래너, 복합 추론
  VISION = 'vision',             // 멀티모달 파서 (이미지/PDF)
  FALLBACK = 'fallback',         // 고가치 fallback
}

// 태스크 특성
export interface Task {
  kind: 'assist' | 'extract' | 'action_preview' | 'plan';
  hasAttachment: boolean;
  hasImage: boolean;
  needsMultiTool: boolean;
  needsRecentData: boolean;
  customerFacing: boolean;
  expectedContextTokens: number;
  highRisk: boolean;
  requiresVision: boolean;
  requiresThinking: boolean;
}

// 라우팅 결과
export interface RoutingResult {
  primary: string;              // 축약형 모델명
  apiModelName: string;         // API 호출용 공식 명칭
  role: ModelRole;
  mode: 'extract' | 'planner' | 'preview_only' | 'final_answer' | 'finalizer';
  fallback: string | null;      // 축약형 fallback 모델명
  fallbackApiName: string | null;
  estimatedCost: number;        // 예상 비용 ($)
  latencyBudget: number;        // 목표 지연 시간 (ms)
  reasoning: string;            // 라우팅 결정 이유
}

// 모델 호출 결과
export interface ModelCallResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    retryable: boolean;
  };
  meta: {
    modelUsed: string;
    fallbackUsed: boolean;
    latencyMs: number;
    tokensIn: number;
    tokensOut: number;
    costUsd: number;
    retryCount: number;
  };
}

// 클라이언트 설정
interface ProviderClient {
  name: string;
  client: AxiosInstance;
  defaultModel: string;
  baseUrl: string;
}

class ModelRouter {
  private clients: Map<string, ProviderClient> = new Map();
  private circuitBreaker: Map<string, { failures: number; lastFailure: number; open: boolean }> = new Map();
  private readonly CIRCUIT_THRESHOLD = 5;
  private readonly CIRCUIT_RESET_MS = 30000; // 30초

  constructor() {
    this.initializeClients();
  }

  private initializeClients() {
    // Kimi (Moonshot) 클라이언트
    const kimiApiKey = process.env.KIMI_API_KEY || '';
    const kimiBaseUrl = process.env.KIMI_BASE_URL || 'https://api.moonshot.cn/v1';

    this.clients.set('kimi', {
      name: 'kimi',
      client: axios.create({
        baseURL: kimiBaseUrl,
        headers: {
          Authorization: `Bearer ${kimiApiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 120000,
      }),
      defaultModel: 'kimi-k2-0905-preview',
      baseUrl: kimiBaseUrl,
    });

    // Anthropic (Claude) 클라이언트
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY || '';
    const anthropicBaseUrl = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1';

    this.clients.set('anthropic', {
      name: 'anthropic',
      client: axios.create({
        baseURL: anthropicBaseUrl,
        headers: {
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        timeout: 120000,
      }),
      defaultModel: 'claude-sonnet-4-6',
      baseUrl: anthropicBaseUrl,
    });

    // Circuit breaker 초기화
    ['kimi', 'anthropic'].forEach(provider => {
      this.circuitBreaker.set(provider, { failures: 0, lastFailure: 0, open: false });
    });
  }

  /**
   * 축약형 → API 공식 명칭 변환
   */
  toApiName(shortName: string): string {
    return MODEL_NAME_MAP[shortName] || shortName;
  }

  /**
   * 태스크 특성에 따른 모델 라우팅
   * 
   * 라우팅 규칙 (개발 계획 기준):
   * 1. 첨부파일 + 이미지 → kimi-k2.5 (vision)
   * 2. 멀티툴 필요 → kimi-k2-thinking (planner)
   * 3. 액션 프리뷰 → kimi-k2-0905-preview (preview_only)
   * 4. 긴 문맥(180K+) + 고객 대면 → claude-sonnet-4-6 (final_answer)
   * 5. 기본 → kimi-k2-0905-preview (finalizer)
   */
  route(task: Task): RoutingResult {
    // 1. 문서 추출 (첨부파일 + 이미지)
    if (task.kind === 'extract' && (task.hasAttachment || task.requiresVision)) {
      return this.createRoutingResult({
        primary: 'kimi-k2.5',
        role: ModelRole.VISION,
        mode: 'extract',
        fallback: 'claude-sonnet-4-6',
        reasoning: 'Document extraction with vision capability required',
      });
    }

    // 2. 액션 프리뷰 (단순 설명용)
    if (task.kind === 'action_preview') {
      return this.createRoutingResult({
        primary: 'kimi-k2-0905',
        role: ModelRole.DEFAULT,
        mode: 'preview_only',
        fallback: null,
        reasoning: 'Action preview requires fast, simple explanation',
      });
    }

    // 3. 멀티툴 또는 최신성 필요
    if (task.needsMultiTool || task.needsRecentData || task.requiresThinking) {
      return this.createRoutingResult({
        primary: 'kimi-k2-thinking',
        role: ModelRole.PLANNER,
        mode: 'planner',
        fallback: 'claude-sonnet-4-6',
        reasoning: 'Multi-tool orchestration or recent data retrieval required',
      });
    }

    // 4. 긴 문맥 + 고객 대면
    if (task.customerFacing && task.expectedContextTokens > 180000) {
      return this.createRoutingResult({
        primary: 'claude-sonnet-4-6',
        role: ModelRole.FALLBACK,
        mode: 'final_answer',
        fallback: null,
        reasoning: 'Long context premium final answer for customer-facing',
      });
    }

    // 5. 고위험 태스크
    if (task.highRisk) {
      return this.createRoutingResult({
        primary: 'claude-sonnet-4-6',
        role: ModelRole.FALLBACK,
        mode: 'final_answer',
        fallback: null,
        reasoning: 'High-risk task requires premium model for safety',
      });
    }

    // 6. 기본 (짧은 텍스트/요약/JSON)
    return this.createRoutingResult({
      primary: 'kimi-k2-0905',
      role: ModelRole.DEFAULT,
      mode: 'finalizer',
      fallback: task.customerFacing ? 'claude-sonnet-4-6' : null,
      reasoning: 'Default text processing and JSON generation',
    });
  }

  private createRoutingResult(config: {
    primary: string;
    role: ModelRole;
    mode: 'extract' | 'planner' | 'preview_only' | 'final_answer' | 'finalizer';
    fallback: string | null;
    reasoning: string;
  }): RoutingResult {
    const estimatedTokens = 4000; // 기본 추정값
    const estimatedCost = this.calculateEstimatedCost(config.primary, estimatedTokens);

    return {
      primary: config.primary,
      apiModelName: this.toApiName(config.primary),
      role: config.role,
      mode: config.mode,
      fallback: config.fallback,
      fallbackApiName: config.fallback ? this.toApiName(config.fallback) : null,
      estimatedCost,
      latencyBudget: this.getLatencyBudget(config.primary),
      reasoning: config.reasoning,
    };
  }

  private calculateEstimatedCost(model: string, tokens: number): number {
    const pricing = MODEL_PRICING[this.toApiName(model)];
    if (!pricing) return 0;

    // input:output = 3:1 가정
    const inputTokens = tokens * 0.75;
    const outputTokens = tokens * 0.25;

    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;

    return Number((inputCost + outputCost).toFixed(6));
  }

  private getLatencyBudget(model: string): number {
    const budgets: Record<string, number> = {
      'kimi-k2-0905': 2000,
      'kimi-k2-thinking': 5000,
      'kimi-k2.5': 4000,
      'claude-sonnet-4-6': 3000,
    };
    return budgets[model] || 5000;
  }

  /**
   * 모델 호출 with Fallback 체인
   */
  async callWithFallback<T = unknown>(
    task: Task,
    preparePayload: (model: string) => Record<string, unknown>,
    options: {
      maxRetries?: number;
      retryDelayMs?: number;
      timeoutMs?: number;
    } = {}
  ): Promise<ModelCallResult<T>> {
    const { maxRetries = 2, retryDelayMs = 1000, timeoutMs = 120000 } = options;

    const routing = this.route(task);
    const modelsToTry = [routing.apiModelName];
    if (routing.fallbackApiName) {
      modelsToTry.push(routing.fallbackApiName);
    }

    let lastError: Error | null = null;
    let fallbackUsed = false;
    const startTime = Date.now();
    let totalTokensIn = 0;
    let totalTokensOut = 0;
    let retryCount = 0;

    for (let i = 0; i < modelsToTry.length; i++) {
      const model = modelsToTry[i];
      const provider = this.getProviderForModel(model);

      if (i > 0) {
        fallbackUsed = true;
        logger.warn({ from: modelsToTry[i - 1], to: model }, 'Falling back to secondary model');
      }

      // Circuit breaker 체크
      if (this.isCircuitOpen(provider.name)) {
        logger.warn({ provider: provider.name }, 'Circuit breaker is open, skipping');
        continue;
      }

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        if (attempt > 0) {
          retryCount++;
          await this.delay(retryDelayMs * attempt);
        }

        try {
          const result = await this.executeModelCall<T>(provider, model, preparePayload(model), timeoutMs);

          // 성공 시 circuit breaker 리셋
          this.resetCircuit(provider.name);

          const latencyMs = Date.now() - startTime;

          return {
            success: true,
            data: result,
            meta: {
              modelUsed: model,
              fallbackUsed,
              latencyMs,
              tokensIn: totalTokensIn + (result?.usage?.inputTokens || 0),
              tokensOut: totalTokensOut + (result?.usage?.outputTokens || 0),
              costUsd: this.calculateActualCost(model, totalTokensIn, totalTokensOut),
              retryCount,
            },
          };
        } catch (err) {
          lastError = err as Error;
          logger.warn({
            err,
            model,
            attempt: attempt + 1,
            maxRetries: maxRetries + 1,
          }, 'Model call failed');

          // Circuit breaker 기록
          this.recordFailure(provider.name);

          // 재시도 가능 여부 체크
          if (!this.isRetryableError(err) || attempt === maxRetries) {
            break;
          }
        }
      }
    }

    // 모든 모델 실패
    const latencyMs = Date.now() - startTime;

    return {
      success: false,
      error: {
        code: 'MODEL_UNAVAILABLE',
        message: lastError?.message || 'All models failed',
        retryable: false,
      },
      meta: {
        modelUsed: modelsToTry[modelsToTry.length - 1] || 'unknown',
        fallbackUsed,
        latencyMs,
        tokensIn: totalTokensIn,
        tokensOut: totalTokensOut,
        costUsd: 0,
        retryCount,
      },
    };
  }

  private getProviderForModel(model: string): ProviderClient {
    if (model.includes('claude')) {
      return this.clients.get('anthropic')!;
    }
    return this.clients.get('kimi')!;
  }

  private async executeModelCall<T>(
    provider: ProviderClient,
    model: string,
    payload: Record<string, unknown>,
    timeoutMs: number
  ): Promise<T & { usage?: { inputTokens: number; outputTokens: number } }> {
    const isAnthropic = provider.name === 'anthropic';

    if (isAnthropic) {
      const response = await provider.client.post(
        '/messages',
        {
          model,
          max_tokens: payload.max_tokens || 4096,
          temperature: payload.temperature || 0.4,
          system: payload.system,
          messages: payload.messages,
        },
        { timeout: timeoutMs }
      );

      return {
        content: response.data.content,
        usage: {
          inputTokens: response.data.usage?.input_tokens || 0,
          outputTokens: response.data.usage?.output_tokens || 0,
        },
      } as T & { usage: { inputTokens: number; outputTokens: number } };
    } else {
      // Kimi
      const response = await provider.client.post(
        '/chat/completions',
        {
          model,
          messages: payload.messages,
          temperature: payload.temperature || 0.4,
          max_tokens: payload.max_tokens || 4096,
          response_format: payload.response_format,
        },
        { timeout: timeoutMs }
      );

      return {
        content: response.data.choices[0]?.message?.content,
        usage: {
          inputTokens: response.data.usage?.prompt_tokens || 0,
          outputTokens: response.data.usage?.completion_tokens || 0,
        },
      } as T & { usage: { inputTokens: number; outputTokens: number } };
    }
  }

  private isCircuitOpen(providerName: string): boolean {
    const state = this.circuitBreaker.get(providerName);
    if (!state) return false;

    if (state.open) {
      const now = Date.now();
      if (now - state.lastFailure > this.CIRCUIT_RESET_MS) {
        // Reset circuit
        state.open = false;
        state.failures = 0;
        return false;
      }
      return true;
    }
    return false;
  }

  private recordFailure(providerName: string): void {
    const state = this.circuitBreaker.get(providerName);
    if (!state) return;

    state.failures++;
    state.lastFailure = Date.now();

    if (state.failures >= this.CIRCUIT_THRESHOLD) {
      state.open = true;
      logger.error({ provider: providerName, failures: state.failures }, 'Circuit breaker opened');
    }
  }

  private resetCircuit(providerName: string): void {
    const state = this.circuitBreaker.get(providerName);
    if (state) {
      state.failures = 0;
      state.open = false;
    }
  }

  private isRetryableError(err: unknown): boolean {
    if (axios.isAxiosError(err)) {
      // 타임아웃, 5xx 에러는 재시도
      return !err.response || err.response.status >= 500 || err.code === 'ECONNABORTED';
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private calculateActualCost(model: string, tokensIn: number, tokensOut: number): number {
    const pricing = MODEL_PRICING[model];
    if (!pricing) return 0;

    const inputCost = (tokensIn / 1_000_000) * pricing.input;
    const outputCost = (tokensOut / 1_000_000) * pricing.output;

    return Number((inputCost + outputCost).toFixed(6));
  }

  /**
   * 모델 상태 확인
   */
  async checkHealth(): Promise<{
    kimi: { status: string; latency: number; circuitOpen: boolean };
    anthropic: { status: string; latency: number; circuitOpen: boolean };
  }> {
    const results = {
      kimi: { status: 'unknown', latency: 0, circuitOpen: false },
      anthropic: { status: 'unknown', latency: 0, circuitOpen: false },
    };

    for (const [name, client] of this.clients) {
      const startTime = Date.now();
      const circuitState = this.circuitBreaker.get(name);

      try {
        if (name === 'anthropic') {
          await client.client.get('/models', { timeout: 5000 });
        } else {
          await client.client.get('/models', { timeout: 5000 });
        }

        results[name as keyof typeof results] = {
          status: 'healthy',
          latency: Date.now() - startTime,
          circuitOpen: circuitState?.open || false,
        };
      } catch (err) {
        results[name as keyof typeof results] = {
          status: 'unhealthy',
          latency: Date.now() - startTime,
          circuitOpen: circuitState?.open || false,
        };
      }
    }

    return results;
  }

  /**
   * 라우팅 설명 생성 (디버깅용)
   */
  explainRouting(task: Task): {
    routing: RoutingResult;
    decisionTree: string[];
  } {
    const routing = this.route(task);
    const decisionTree: string[] = [];

    if (task.kind === 'extract' && (task.hasAttachment || task.requiresVision)) {
      decisionTree.push('1. Task is extract with attachment/vision → kimi-k2.5');
    } else if (task.kind === 'action_preview') {
      decisionTree.push('1. Task is action_preview → kimi-k2-0905 (fast preview)');
    } else if (task.needsMultiTool || task.needsRecentData) {
      decisionTree.push('1. Multi-tool or recent data needed → kimi-k2-thinking');
    } else if (task.customerFacing && task.expectedContextTokens > 180000) {
      decisionTree.push('1. Long context + customer facing → claude-sonnet-4-6');
    } else if (task.highRisk) {
      decisionTree.push('1. High risk task → claude-sonnet-4-6 (safety)');
    } else {
      decisionTree.push('1. Default text processing → kimi-k2-0905');
    }

    if (routing.fallback) {
      decisionTree.push(`2. Fallback configured: ${routing.fallback}`);
    }

    decisionTree.push(`3. Estimated cost: $${routing.estimatedCost.toFixed(6)}`);
    decisionTree.push(`4. Latency budget: ${routing.latencyBudget}ms`);

    return { routing, decisionTree };
  }
}

// Export singleton
export const modelRouter = new ModelRouter();
