/**
 * Tool Gateway Service
 * LIDER Tool Orchestration & External Connector Management
 * 
 * Read tools: *_read, *_lookup, *_search (AI 호출 가능)
 * Write tools: *_execute (Backend only)
 * Preview tools: *_preview
 */

import axios, { AxiosInstance } from 'axios';
import { loggers } from '../utils/logger';

const logger = loggers.ai;

// 툴 결과 타입
export interface ToolResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    retryable: boolean;
  };
  meta: {
    toolName: string;
    latencyMs: number;
    cached: boolean;
    source?: string;
  };
}

// 툴 컨텍스트
export interface ToolContext {
  userId: string;
  orgId: string;
  sessionId?: string;
  permissions: string[];
  source: 'llm' | 'backend' | 'user';
  timestamp: string;
}

// 툴 인터페이스
export interface Tool<TInput = unknown, TOutput = unknown> {
  name: string;
  description: string;
  readonly backendOnly: boolean;
  readonly requiresAuth: boolean;
  readonly cacheable: boolean;
  readonly cacheTtl: number; // seconds

  execute(input: TInput, context: ToolContext): Promise<ToolResult<TOutput>>;
  validate(input: TInput): boolean;
}

// 내부 검색 파라미터
export interface InternalSearchInput {
  query: string;
  filters?: {
    type?: 'recipients' | 'records' | 'documents' | 'consultations' | 'all';
    orgId?: string;
    dateRange?: { from: string; to: string };
    tags?: string[];
  };
  limit?: number;
}

// CRM 조회 파라미터
export interface CRMLookupInput {
  recipientId?: string;
  query?: string;
  fields?: string[];
}

// 티켓 조회 파라미터
export interface TicketReadInput {
  ticketId?: string;
  status?: 'open' | 'pending' | 'resolved' | 'closed' | 'all';
  assignee?: string;
  limit?: number;
}

// 문서 조회 파라미터
export interface DocFetchInput {
  docId?: string;
  query?: string;
  source: 'notion' | 'confluence' | 'internal';
}

// ==================== 내부 검색 툴 ====================
class InternalSearchTool implements Tool<InternalSearchInput, unknown[]> {
  name = 'internal_search';
  description = 'Search internal database for recipients, care records, documents, and consultations';
  backendOnly = false;
  requiresAuth = true;
  cacheable = true;
  cacheTtl = 300; // 5 minutes

  async execute(input: InternalSearchInput, context: ToolContext): Promise<ToolResult<unknown[]>> {
    const startTime = Date.now();

    try {
      // 실제 구현에서는 Prisma/DB 쿼리
      // 현재는 시뮬레이션
      const mockResults = await this.simulateSearch(input, context);

      return {
        success: true,
        data: mockResults,
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
          source: 'postgresql',
        },
      };
    } catch (err) {
      logger.error({ err, input }, 'Internal search failed');
      return {
        success: false,
        error: {
          code: 'SEARCH_ERROR',
          message: (err as Error).message,
          retryable: true,
        },
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
        },
      };
    }
  }

  private async simulateSearch(input: InternalSearchInput, context: ToolContext): Promise<unknown[]> {
    // 실제 구현시 Prisma 쿼리로 대체
    return [
      {
        type: 'recipient',
        id: 'rec_001',
        name: '김철수',
        careGrade: '2등급',
        matchedFields: ['name'],
      },
      {
        type: 'care_record',
        id: 'rec_002',
        recipientName: '김철수',
        date: '2026-03-20',
        matchedFields: ['content'],
      },
    ].slice(0, input.limit || 10);
  }

  validate(input: InternalSearchInput): boolean {
    return typeof input.query === 'string' && input.query.length > 0;
  }
}

// ==================== CRM 조회 툴 ====================
class CRMLookupTool implements Tool<CRMLookupInput, unknown> {
  name = 'crm_lookup';
  description = 'Lookup customer information from CRM (Salesforce)';
  backendOnly = false;
  requiresAuth = true;
  cacheable = true;
  cacheTtl = 600; // 10 minutes

  private client: AxiosInstance | null = null;

  constructor() {
    const baseUrl = process.env.SALESFORCE_BASE_URL;
    const token = process.env.SALESFORCE_ACCESS_TOKEN;

    if (baseUrl && token) {
      this.client = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
    }
  }

  async execute(input: CRMLookupInput, context: ToolContext): Promise<ToolResult<unknown>> {
    const startTime = Date.now();

    if (!this.client) {
      return {
        success: false,
        error: {
          code: 'NOT_CONFIGURED',
          message: 'Salesforce CRM not configured',
          retryable: false,
        },
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
        },
      };
    }

    try {
      // Salesforce SOQL 쿼리
      const query = input.recipientId
        ? `SELECT Id, Name, Phone, Email, CreatedDate FROM Contact WHERE Id = '${input.recipientId}'`
        : `SELECT Id, Name, Phone, Email FROM Contact WHERE Name LIKE '%${input.query}%' LIMIT 10`;

      const response = await this.client.get(`/services/data/v58.0/query?q=${encodeURIComponent(query)}`);

      return {
        success: true,
        data: response.data.records,
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
          source: 'salesforce',
        },
      };
    } catch (err) {
      logger.error({ err, input }, 'CRM lookup failed');
      return {
        success: false,
        error: {
          code: 'CRM_ERROR',
          message: (err as Error).message,
          retryable: axios.isAxiosError(err) && err.response?.status === 503,
        },
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
        },
      };
    }
  }

  validate(input: CRMLookupInput): boolean {
    return !!(input.recipientId || input.query);
  }
}

// ==================== 티켓 조회 툴 (Zendesk) ====================
class TicketReadTool implements Tool<TicketReadInput, unknown> {
  name = 'ticket_read';
  description = 'Read tickets from Zendesk';
  backendOnly = false;
  requiresAuth = true;
  cacheable = true;
  cacheTtl = 300;

  private client: AxiosInstance | null = null;

  constructor() {
    const subdomain = process.env.ZENDESK_SUBDOMAIN;
    const email = process.env.ZENDESK_EMAIL;
    const token = process.env.ZENDESK_API_TOKEN;

    if (subdomain && email && token) {
      const auth = Buffer.from(`${email}/token:${token}`).toString('base64');
      this.client = axios.create({
        baseURL: `https://${subdomain}.zendesk.com/api/v2`,
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
    }
  }

  async execute(input: TicketReadInput, context: ToolContext): Promise<ToolResult<unknown>> {
    const startTime = Date.now();

    if (!this.client) {
      return {
        success: false,
        error: {
          code: 'NOT_CONFIGURED',
          message: 'Zendesk not configured',
          retryable: false,
        },
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
        },
      };
    }

    try {
      let endpoint = '/tickets.json';
      if (input.ticketId) {
        endpoint = `/tickets/${input.ticketId}.json`;
      }

      const response = await this.client.get(endpoint, {
        params: {
          status: input.status !== 'all' ? input.status : undefined,
          assignee_id: input.assignee,
          per_page: input.limit || 25,
        },
      });

      return {
        success: true,
        data: response.data.tickets || response.data,
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
          source: 'zendesk',
        },
      };
    } catch (err) {
      logger.error({ err, input }, 'Ticket read failed');
      return {
        success: false,
        error: {
          code: 'ZENDESK_ERROR',
          message: (err as Error).message,
          retryable: true,
        },
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
        },
      };
    }
  }

  validate(input: TicketReadInput): boolean {
    return true; // status만으로도 조회 가능
  }
}

// ==================== 문서 조회 툴 (Notion) ====================
class DocFetchTool implements Tool<DocFetchInput, unknown> {
  name = 'doc_fetch';
  description = 'Fetch documents from Notion, Confluence, or internal knowledge base';
  backendOnly = false;
  requiresAuth = true;
  cacheable = true;
  cacheTtl = 600;

  private notionClient: AxiosInstance | null = null;

  constructor() {
    const notionToken = process.env.NOTION_API_TOKEN;

    if (notionToken) {
      this.notionClient = axios.create({
        baseURL: 'https://api.notion.com/v1',
        headers: {
          Authorization: `Bearer ${notionToken}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
    }
  }

  async execute(input: DocFetchInput, context: ToolContext): Promise<ToolResult<unknown>> {
    const startTime = Date.now();

    try {
      let result: unknown;

      switch (input.source) {
        case 'notion':
          result = await this.fetchFromNotion(input);
          break;
        case 'confluence':
          result = await this.fetchFromConfluence(input);
          break;
        case 'internal':
        default:
          result = await this.fetchFromInternal(input, context);
      }

      return {
        success: true,
        data: result,
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
          source: input.source,
        },
      };
    } catch (err) {
      logger.error({ err, input }, 'Doc fetch failed');
      return {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: (err as Error).message,
          retryable: true,
        },
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
        },
      };
    }
  }

  private async fetchFromNotion(input: DocFetchInput): Promise<unknown> {
    if (!this.notionClient) {
      throw new Error('Notion not configured');
    }

    if (input.docId) {
      const response = await this.notionClient.get(`/pages/${input.docId}`);
      return response.data;
    }

    // Search
    const response = await this.notionClient.post('/search', {
      query: input.query,
      page_size: 10,
    });

    return response.data.results;
  }

  private async fetchFromConfluence(input: DocFetchInput): Promise<unknown> {
    // Confluence 구현
    return { message: 'Confluence integration placeholder' };
  }

  private async fetchFromInternal(input: DocFetchInput, context: ToolContext): Promise<unknown> {
    // 내부 문서 시스템 구현
    return { message: 'Internal doc fetch placeholder' };
  }

  validate(input: DocFetchInput): boolean {
    return !!(input.docId || input.query);
  }
}

// ==================== 권한 체크 툴 ====================
class PermissionCheckTool implements Tool<{ action: string; resourceId?: string }, unknown> {
  name = 'permission_check';
  description = 'Check user permissions for actions and resources';
  backendOnly = false;
  requiresAuth = true;
  cacheable = true;
  cacheTtl = 60; // 1 minute (권한은 자주 변경될 수 있음)

  async execute(
    input: { action: string; resourceId?: string },
    context: ToolContext
  ): Promise<ToolResult<unknown>> {
    const startTime = Date.now();

    try {
      // 실제 구현에서는 DB/Poliy Engine 조회
      const hasPermission = context.permissions.includes(input.action) ||
        context.permissions.includes('admin');

      const result = {
        allowed: hasPermission,
        action: input.action,
        resourceId: input.resourceId,
        userId: context.userId,
        missingChecks: hasPermission ? [] : [input.action],
      };

      return {
        success: true,
        data: result,
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
          source: 'policy_engine',
        },
      };
    } catch (err) {
      logger.error({ err, input }, 'Permission check failed');
      return {
        success: false,
        error: {
          code: 'PERMISSION_ERROR',
          message: (err as Error).message,
          retryable: false,
        },
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
        },
      };
    }
  }

  validate(input: { action: string; resourceId?: string }): boolean {
    return typeof input.action === 'string' && input.action.length > 0;
  }
}

// ==================== Web Search 툴 ====================
class WebSearchTool implements Tool<{ query: string; limit?: number }, unknown> {
  name = 'web_search';
  description = 'Search the web for information';
  backendOnly = false;
  requiresAuth = true;
  cacheable = true;
  cacheTtl = 3600; // 1 hour

  async execute(
    input: { query: string; limit?: number },
    context: ToolContext
  ): Promise<ToolResult<unknown>> {
    const startTime = Date.now();

    try {
      // 실제 구현에서는 Search API (SerpAPI, Bing, etc.)
      // 현재는 시뮬레이션
      const mockResults = [
        { title: '장기요양보험 제도 안내', url: 'https://www.nhis.or.kr', snippet: '국민건강보험공단 장기요양보험 제도 안내' },
        { title: '요양기관 업무 매뉴얼', url: 'https://example.com/manual', snippet: '2026년 요양기관 업무 처리 매뉴얼' },
      ].slice(0, input.limit || 5);

      return {
        success: true,
        data: mockResults,
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
          source: 'web',
        },
      };
    } catch (err) {
      return {
        success: false,
        error: {
          code: 'SEARCH_ERROR',
          message: (err as Error).message,
          retryable: true,
        },
        meta: {
          toolName: this.name,
          latencyMs: Date.now() - startTime,
          cached: false,
        },
      };
    }
  }

  validate(input: { query: string; limit?: number }): boolean {
    return typeof input.query === 'string' && input.query.length > 0;
  }
}

// ==================== Tool Gateway ====================
class ToolGateway {
  private tools: Map<string, Tool<unknown, unknown>> = new Map();
  private cache: Map<string, { data: unknown; expiresAt: number }> = new Map();

  constructor() {
    this.registerDefaultTools();
    this.startCacheCleanup();
  }

  private registerDefaultTools() {
    this.register(new InternalSearchTool());
    this.register(new CRMLookupTool());
    this.register(new TicketReadTool());
    this.register(new DocFetchTool());
    this.register(new PermissionCheckTool());
    this.register(new WebSearchTool());
  }

  register<TInput, TOutput>(tool: Tool<TInput, TOutput>): void {
    this.tools.set(tool.name, tool as Tool<unknown, unknown>);
    logger.info({ toolName: tool.name }, 'Tool registered');
  }

  async execute<TInput, TOutput>(
    toolName: string,
    input: TInput,
    context: ToolContext
  ): Promise<ToolResult<TOutput>> {
    const tool = this.tools.get(toolName);

    if (!tool) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_TOOL',
          message: `Tool '${toolName}' not found`,
          retryable: false,
        },
        meta: {
          toolName,
          latencyMs: 0,
          cached: false,
        },
      };
    }

    // Validation
    if (!tool.validate(input)) {
      return {
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: `Invalid input for tool '${toolName}'`,
          retryable: false,
        },
        meta: {
          toolName,
          latencyMs: 0,
          cached: false,
        },
      };
    }

    // Backend-only check
    if (tool.backendOnly && context.source === 'llm') {
      return {
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: `Tool '${toolName}' is backend-only`,
          retryable: false,
        },
        meta: {
          toolName,
          latencyMs: 0,
          cached: false,
        },
      };
    }

    // Cache check
    if (tool.cacheable && tool.cacheTtl > 0) {
      const cacheKey = this.generateCacheKey(toolName, input, context);
      const cached = this.cache.get(cacheKey);

      if (cached && cached.expiresAt > Date.now()) {
        return {
          success: true,
          data: cached.data as TOutput,
          meta: {
            toolName,
            latencyMs: 0,
            cached: true,
          },
        };
      }
    }

    // Execute
    const result = await tool.execute(input, context);

    // Cache store
    if (tool.cacheable && tool.cacheTtl > 0 && result.success && result.data) {
      const cacheKey = this.generateCacheKey(toolName, input, context);
      this.cache.set(cacheKey, {
        data: result.data,
        expiresAt: Date.now() + tool.cacheTtl * 1000,
      });
    }

    return result as ToolResult<TOutput>;
  }

  private generateCacheKey(toolName: string, input: unknown, context: ToolContext): string {
    const inputHash = Buffer.from(JSON.stringify(input)).toString('base64').slice(0, 32);
    return `${toolName}:${context.orgId}:${inputHash}`;
  }

  private startCacheCleanup(): void {
    // 5분마다 만료된 캐시 정리
    setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.cache) {
        if (value.expiresAt < now) {
          this.cache.delete(key);
        }
      }
    }, 5 * 60 * 1000);
  }

  listTools(): Array<{ name: string; description: string; backendOnly: boolean; cacheable: boolean }> {
    return Array.from(this.tools.values()).map(tool => ({
      name: tool.name,
      description: tool.description,
      backendOnly: tool.backendOnly,
      cacheable: tool.cacheable,
    }));
  }

  getToolInfo(toolName: string): { name: string; description: string; backendOnly: boolean } | null {
    const tool = this.tools.get(toolName);
    if (!tool) return null;

    return {
      name: tool.name,
      description: tool.description,
      backendOnly: tool.backendOnly,
    };
  }

  // 헬스체크
  async healthCheck(): Promise<Record<string, { status: string; error?: string }>> {
    const results: Record<string, { status: string; error?: string }> = {};

    for (const [name, tool] of this.tools) {
      try {
        // 간단한 헬스체크 - validate 테스트
        const isHealthy = tool.validate !== undefined;
        results[name] = { status: isHealthy ? 'healthy' : 'degraded' };
      } catch (err) {
        results[name] = { status: 'unhealthy', error: (err as Error).message };
      }
    }

    return results;
  }
}

// Export singleton
export const toolGateway = new ToolGateway();
