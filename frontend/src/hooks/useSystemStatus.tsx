import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { resolveSameOriginAwareApiBaseUrl } from '../utils/apiBaseUrl';

export type SystemHealthState = 'loading' | 'healthy' | 'limited' | 'degraded' | 'offline';
export type SystemStatusFreshness = 'live' | 'cached' | 'unavailable';
export type SystemStatusScope = 'public-worker' | 'backend' | 'unknown';

export interface SystemStatus {
  apiBaseUrl: string;
  overall: SystemHealthState;
  freshness: SystemStatusFreshness;
  isRefreshing: boolean;
  backendOnline: boolean;
  databaseConnected: boolean | null;
  publicDataReachable: boolean | null;
  publicDataApiKeyConfigured: boolean | null;
  responseTimeMs: number | null;
  checkedAt: string | null;
  apiVersion: string | null;
  statusScope: SystemStatusScope;
  note: string;
}

interface SystemStatusContextValue {
  status: SystemStatus;
}

const SystemStatusContext = createContext<SystemStatusContextValue | undefined>(undefined);

const POLL_INTERVAL_MS = 60_000;
const STORAGE_KEY = 'lider.system-status.v1';

async function fetchJson(url: string) {
  const startedAt = performance.now();
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  const body = await response.json().catch(() => null);

  return {
    ok: response.ok,
    status: response.status,
    body,
    responseTimeMs: Math.round(performance.now() - startedAt),
  };
}

function readStatusScope(summary: Awaited<ReturnType<typeof fetchJson>> | null, detail: Awaited<ReturnType<typeof fetchJson>> | null): SystemStatusScope {
  const rawScope = detail?.body?.data?.scope ?? summary?.body?.data?.scope;
  return rawScope === 'public-worker' || rawScope === 'backend' ? rawScope : 'unknown';
}

async function loadSystemStatus(apiBaseUrl: string): Promise<SystemStatus> {
  const [summaryResult, detailResult, publicDataResult] = await Promise.allSettled([
    fetchJson(`${apiBaseUrl}/v1/health`),
    fetchJson(`${apiBaseUrl}/v1/health/detail`),
    fetchJson(`${apiBaseUrl}/v1/public-data/status`),
  ]);

  if (summaryResult.status === 'rejected' && detailResult.status === 'rejected') {
    throw new Error('Core health endpoints are unavailable.');
  }

  const summary = summaryResult.status === 'fulfilled' ? summaryResult.value : null;
  const detail = detailResult.status === 'fulfilled' ? detailResult.value : null;
  const publicData = publicDataResult.status === 'fulfilled' ? publicDataResult.value : null;

  const backendOnline = Boolean(summary?.ok || detail?.ok);
  const statusScope = readStatusScope(summary, detail);
  const databaseConnected =
    typeof detail?.body?.data?.checks?.database === 'boolean'
      ? detail.body.data.checks.database
      : null;
  const publicDataStatus =
    typeof publicData?.body?.data?.status === 'string' ? publicData.body.data.status : null;
  const publicDataReachable =
    publicDataStatus === 'operational'
      ? true
      : publicDataStatus === 'error' || publicDataStatus === 'unavailable' || publicDataStatus === 'unreachable'
        ? false
        : null;
  const publicDataApiKeyConfigured =
    typeof publicData?.body?.data?.apiKeyConfigured === 'boolean'
      ? publicData.body.data.apiKeyConfigured
      : null;

  let overall: SystemHealthState = 'offline';
  let note = '상태 엔드포인트에 연결하지 못했습니다.';

  if (backendOnline) {
    if (statusScope === 'public-worker') {
      overall = 'limited';
      note = '공개 Worker 응답은 확인됐지만 DB와 공공데이터 운영 상태는 이 배포에서 미확인입니다.';
    } else if (databaseConnected === false || publicDataReachable === false) {
      overall = 'degraded';
      note = databaseConnected === false
        ? '백엔드는 응답하지만 DB 점검이 필요합니다.'
        : '공공데이터 연동 상태를 다시 점검해야 합니다.';
    } else if (
      databaseConnected === null ||
      publicDataReachable === null ||
      publicDataApiKeyConfigured === null
    ) {
      overall = 'limited';
      note = '핵심 응답은 확인됐지만 일부 운영 상태는 아직 확정하지 못했습니다.';
    } else {
      overall = 'healthy';
      note = '백엔드와 핵심 연동 상태가 정상입니다.';
    }

    if (publicDataApiKeyConfigured === false) {
      overall = overall === 'healthy' ? 'limited' : overall;
      note = '공공데이터 API 키가 없어 일부 연동 기능은 제한됩니다.';
    }
  }

  return {
    apiBaseUrl,
    overall,
    freshness: 'live',
    isRefreshing: false,
    backendOnline,
    databaseConnected,
    publicDataReachable,
    publicDataApiKeyConfigured,
    responseTimeMs: summary?.responseTimeMs ?? detail?.responseTimeMs ?? null,
    checkedAt:
      detail?.body?.data?.checks?.timestamp ??
      summary?.body?.data?.timestamp ??
      new Date().toISOString(),
    apiVersion:
      typeof summary?.body?.data?.version === 'string' ? summary.body.data.version : null,
    statusScope,
    note,
  };
}

const initialStatus: SystemStatus = {
  apiBaseUrl: resolveSameOriginAwareApiBaseUrl(),
  overall: 'loading',
  freshness: 'unavailable',
  isRefreshing: true,
  backendOnline: false,
  databaseConnected: null,
  publicDataReachable: null,
  publicDataApiKeyConfigured: null,
  responseTimeMs: null,
  checkedAt: null,
  apiVersion: null,
  statusScope: 'unknown',
  note: '운영 상태를 확인하는 중입니다.',
};

function createDefaultStatus(apiBaseUrl: string): SystemStatus {
  return {
    ...initialStatus,
    apiBaseUrl,
  };
}

function createUnavailableStatus(apiBaseUrl: string, previousStatus?: SystemStatus): SystemStatus {
  if (previousStatus?.checkedAt && previousStatus.freshness !== 'unavailable') {
    return {
      ...previousStatus,
      apiBaseUrl,
      freshness: 'cached',
      isRefreshing: false,
      note: '실시간 확인은 실패해 최근 상태 기준으로 표시합니다.',
    };
  }

  return {
    ...createDefaultStatus(apiBaseUrl),
    overall: 'offline',
    freshness: 'unavailable',
    isRefreshing: false,
    note: '운영 상태를 확인하지 못했습니다.',
  };
}

function readCachedStatus(apiBaseUrl: string): SystemStatus | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<SystemStatus>;
    if (!parsed || typeof parsed !== 'object' || parsed.apiBaseUrl !== apiBaseUrl) {
      return null;
    }

    return {
      ...createDefaultStatus(apiBaseUrl),
      ...parsed,
      freshness: 'cached',
      isRefreshing: true,
      note: parsed.checkedAt
        ? '최근 확인된 상태를 먼저 보여주고 있으며 최신 상태를 다시 확인하는 중입니다.'
        : createDefaultStatus(apiBaseUrl).note,
    };
  } catch {
    return null;
  }
}

function persistStatus(status: SystemStatus) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...status,
        freshness: 'live',
        isRefreshing: false,
      })
    );
  } catch {
    // Ignore storage write failures and keep the live status in memory.
  }
}

export function SystemStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SystemStatus>(() => {
    const apiBaseUrl = resolveSameOriginAwareApiBaseUrl();
    return readCachedStatus(apiBaseUrl) ?? createDefaultStatus(apiBaseUrl);
  });

  useEffect(() => {
    const apiBaseUrl = resolveSameOriginAwareApiBaseUrl();
    let cancelled = false;

    const updateStatus = async () => {
      try {
        const nextStatus = await loadSystemStatus(apiBaseUrl);
        if (!cancelled) {
          persistStatus(nextStatus);
          setStatus(nextStatus);
        }
      } catch {
        if (!cancelled) {
          setStatus((previousStatus) => createUnavailableStatus(apiBaseUrl, previousStatus));
        }
      }
    };

    void updateStatus();
    const intervalId = window.setInterval(() => {
      void updateStatus();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <SystemStatusContext.Provider value={{ status }}>
      {children}
    </SystemStatusContext.Provider>
  );
}

export function useSystemStatus() {
  const context = useContext(SystemStatusContext);

  if (!context) {
    throw new Error('useSystemStatus must be used within SystemStatusProvider');
  }

  return context;
}
