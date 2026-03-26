import { Menu, Bell, Search, User, Bot, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../ui/StatusBadge';
import { useSystemStatus } from '../../hooks/useSystemStatus';
import { mockAlerts } from '../../data/mockData';
import { getUnreadAlertCount } from '../../utils/alerts';

interface HeaderProps {
  onMenuToggle: () => void;
  sidebarOpen?: boolean;
  isDesktop?: boolean;
}

export function Header2026({ onMenuToggle, isDesktop }: HeaderProps) {
  const notifications = getUnreadAlertCount(mockAlerts);
  const { status } = useSystemStatus();

  const statusBadge =
    status.freshness === 'cached'
      ? {
          variant: 'info' as const,
          label: status.overall === 'healthy' ? '최근 정상 상태' : '최근 상태 기준',
        }
      : {
          loading: { variant: 'info' as const, label: '연결 확인 중' },
          healthy: { variant: 'active' as const, label: '운영 정상' },
          limited: { variant: 'warning' as const, label: '제한적 확인' },
          degraded: { variant: 'warning' as const, label: '점검 필요' },
          offline: { variant: 'error' as const, label: '오프라인' },
        }[status.overall];
  const statusSummary = status.checkedAt
    ? `${status.statusScope === 'public-worker' ? '공개 Worker 기준 ' : '최근 점검 '}${new Date(status.checkedAt).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      })}${status.isRefreshing ? ' · 다시 확인 중' : ''}`
    : status.isRefreshing
      ? '상태 수집 중'
      : '상태 확인 필요';

  return (
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-6 lg:px-8">
      <div className="glass-lg px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-3 lg:min-w-[280px]">
            <div className="flex items-center gap-3">
              <button
                onClick={onMenuToggle}
                className="focus-ring rounded-2xl border border-[color:var(--border-subtle)] bg-white/80 p-2.5 text-[color:var(--text-primary)] transition-colors duration-200 hover:bg-white"
                aria-label="메뉴 토글"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-[color:var(--text-strong)] sm:text-base">은샘노인재가복지센터</span>
                  {!isDesktop && <StatusBadge variant={statusBadge.variant} label={statusBadge.label} dot={false} size="sm" />}
                </div>
                <p className="mt-1 text-xs text-[color:var(--text-muted)]">{statusSummary}</p>
              </div>
            </div>
          </div>

          <div className="hidden flex-1 md:block lg:max-w-[420px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--text-soft)]" />
              <input
                type="text"
                placeholder="통합 검색 준비 중"
                disabled
                aria-disabled="true"
                className="w-full cursor-not-allowed rounded-2xl border border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.78)] py-3 pl-11 pr-4 text-sm text-[color:var(--text-soft)]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 lg:justify-end">
            <div className="hidden items-center gap-3 lg:flex">
              <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
                <StatusBadge variant={statusBadge.variant} label={statusBadge.label} dot={false} size="sm" />
                {status.responseTimeMs !== null && (
                  <span className="text-xs text-[color:var(--text-muted)]">
                    {status.statusScope === 'public-worker' ? 'Worker' : 'API'} {status.responseTimeMs}ms
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/assistant"
                className="focus-ring hidden items-center gap-2 rounded-2xl bg-[var(--action-600)] px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--action-700)] md:flex"
              >
                <Bot className="h-4 w-4" />
                <span>AI 도우미</span>
              </Link>

              <Link
                to="/alerts"
                className="focus-ring relative rounded-2xl border border-[color:var(--border-subtle)] bg-white/80 p-2.5 transition-colors hover:bg-white"
                aria-label="알림 센터"
              >
                <Bell className="h-5 w-5 text-[color:var(--text-primary)]" />
                {notifications > 0 && (
                  <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--danger-600)] text-xs font-bold text-white ring-2 ring-white animate-pulse">
                    {notifications}
                  </span>
                )}
              </Link>

              <Link
                to="/settings"
                className="focus-ring rounded-2xl border border-[color:var(--border-subtle)] bg-white/80 p-2.5 transition-colors hover:bg-white"
                aria-label="설정"
              >
                <Settings className="h-5 w-5 text-[color:var(--text-primary)]" />
              </Link>

              <div className="ml-1 flex items-center gap-3 border-l border-[color:var(--border-subtle)] pl-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-[color:var(--text-strong)]">이순옥 원장</p>
                  <p className="text-xs text-[color:var(--text-muted)]">운영 관리자</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[linear-gradient(180deg,rgba(223,244,244,0.85),rgba(255,253,250,0.95))] shadow-sm">
                  <User className="h-5 w-5 text-[color:var(--brand-700)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
