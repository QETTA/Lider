import { NavLink } from 'react-router-dom';
import {
  Bot,
  LayoutDashboard,
  Smartphone,
  FileText,
  MessageSquare,
  Users,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  X,
  HeartHandshake,
} from 'lucide-react';
import { mockAlerts, mockDashboardStats } from '../../data/mockData';
import { getUnreadAlertCount } from '../../utils/alerts';
import { GlassCard } from '../ui/GlassCard';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  isDesktop: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

const menuItems = [
  { path: '/dashboard', label: '대시보드', icon: LayoutDashboard },
  { path: '/mobile-entry', label: '현장 기록', icon: Smartphone },
  { path: '/documents', label: '평가 문서', icon: FileText },
  { path: '/consultation', label: '상담 기록', icon: MessageSquare },
  { path: '/elderly', label: '어르신 관리', icon: Users },
];

export function Sidebar2026({ isOpen, isDesktop, onToggle, onNavigate }: SidebarProps) {
  const expanded = isDesktop ? isOpen : true;
  const unreadNotifications = getUnreadAlertCount(mockAlerts);
  const visitCompletionRate =
    mockDashboardStats.todayVisitsTotal > 0
      ? (mockDashboardStats.todayVisitsCompleted / mockDashboardStats.todayVisitsTotal) * 100
      : 0;
  const bottomItems = [
    { path: '/alerts', label: '알림', icon: Bell, badge: unreadNotifications },
    { path: '/assistant', label: 'AI 도우미', icon: Bot },
    { path: '/settings', label: '설정', icon: Settings },
  ];
  const sidebarStyle = {
    left: 0,
    top: 0,
    bottom: 0,
    width: expanded ? '18rem' : '6rem',
    transform: !isDesktop && !isOpen ? 'translateX(calc(-100% - 24px))' : 'translateX(0)',
  } as const;

  return (
    <aside
      style={sidebarStyle}
      className={cn(
        'fixed z-50 flex transition-all duration-300 ease-out'
      )}
    >
      <div className="absolute inset-0 rounded-r-[2rem] border-r border-[color:var(--border-overlay)] bg-[rgba(250,248,244,0.92)] shadow-[var(--shadow-float)] backdrop-blur-xl" />

      <div className="relative flex h-full w-full flex-col">
        <div className="flex h-20 items-center gap-3 border-b border-[color:var(--border-subtle)] px-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--border-accent)] bg-[linear-gradient(180deg,rgba(223,244,244,0.95),rgba(242,246,243,0.92))] text-[color:var(--action-700)] shadow-sm">
              <HeartHandshake className="h-5 w-5" />
            </div>
            {expanded && (
              <div className="min-w-0 overflow-hidden">
                <h1 className="truncate text-lg font-bold text-[color:var(--text-strong)]">LIDER</h1>
                <p className="truncate text-[11px] font-medium tracking-[0.08em] text-[color:var(--text-muted)]">
                  차분한 신뢰, 정확한 운영
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onToggle}
            className="rounded-xl p-2 text-[color:var(--text-muted)] transition-colors hover:bg-white/80 hover:text-[color:var(--text-strong)]"
            aria-label={isDesktop ? '사이드바 토글' : '사이드바 닫기'}
          >
            {isDesktop ? (
              expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <div className={cn('mb-3 px-3 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-soft)]', !expanded && 'sr-only')}>
            운영 메뉴
          </div>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center gap-3 rounded-2xl border px-3 py-3 transition-all duration-300',
                      isActive
                        ? 'border-[color:var(--border-accent)] bg-[var(--action-100)] text-[color:var(--action-700)] shadow-sm'
                        : 'border-transparent text-[color:var(--text-primary)] hover:bg-white/70 hover:text-[color:var(--text-strong)]'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className={cn('rounded-2xl p-2.5 transition-colors', expanded ? '' : 'mx-auto')}>
                        <item.icon
                          className={cn(
                            'h-5 w-5 shrink-0',
                            isActive
                              ? 'text-[color:var(--action-700)]'
                              : 'text-[color:var(--text-muted)] group-hover:text-[color:var(--brand-800)]'
                          )}
                        />
                      </div>
                      {expanded && (
                        <>
                          <span className="whitespace-nowrap font-medium">{item.label}</span>
                          {isActive && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-[var(--action-600)]" />
                          )}
                        </>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mx-3 my-5 h-px bg-[linear-gradient(90deg,transparent,rgba(39,53,45,0.12),transparent)]" />

          {expanded && (
            <GlassCard variant="accent" hover="none" className="mx-1 mb-4 p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)]">오늘 현황</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[color:var(--text-primary)]">방문 완료</span>
                  <span className="font-semibold text-[color:var(--success-600)]">
                    {mockDashboardStats.todayVisitsCompleted}/{mockDashboardStats.todayVisitsTotal}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/70">
                  <div className="h-full rounded-full bg-[var(--action-600)]" style={{ width: `${visitCompletionRate}%` }} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[color:var(--text-primary)]">AI 초안</span>
                  <span className="font-semibold text-[color:var(--action-700)]">{mockDashboardStats.aiDraftsGenerated}</span>
                </div>
              </div>
            </GlassCard>
          )}
        </nav>

        <div className="border-t border-[color:var(--border-subtle)] p-3">
          <ul className="space-y-1">
            {bottomItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-2xl border px-3 py-3 transition-all duration-300',
                      isActive
                        ? 'border-[color:var(--border-subtle)] bg-white text-[color:var(--text-strong)] shadow-sm'
                        : 'border-transparent text-[color:var(--text-primary)] hover:bg-white/70 hover:text-[color:var(--text-strong)]'
                    )
                  }
                >
                  <div className={cn('relative', expanded ? '' : 'mx-auto')}>
                    <item.icon className="h-5 w-5 shrink-0 text-[color:var(--text-muted)]" />
                    {item.badge && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--danger-600)] text-xs font-bold text-white ring-2 ring-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {expanded && <span className="whitespace-nowrap font-medium">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          {expanded && (
            <div className="surface-tint mt-4 px-3 py-3">
              <p className="text-sm font-semibold text-[color:var(--text-strong)]">모바일 현장앱 점검</p>
              <p className="mt-1 text-xs leading-5 text-[color:var(--text-muted)]">기록 입력과 서류 업로드 흐름을 같은 운영 톤으로 맞추는 단계입니다.</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
