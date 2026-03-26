import { useMemo, useState } from 'react';
import { AlertTriangle, Bell, CheckCircle2, Clock, Filter, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockAlerts } from '../data/mockData';
import type { Alert } from '../types';
import { MetricTile, PageHeader, SectionCard, StatusBadge } from '../components/ui';
import { getUnreadAlertCount } from '../utils/alerts';
import { getAlertTarget } from '../utils/routes';

export function AlertsCenter() {
  const [filter, setFilter] = useState<'all' | Alert['severity']>('all');

  const alerts = useMemo(
    () => mockAlerts.filter((alert) => filter === 'all' || alert.severity === filter),
    [filter]
  );

  const unreadCount = getUnreadAlertCount(mockAlerts);

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        eyebrow="알림 관리"
        title="알림 센터"
        description="죽어 있던 알림 경로를 실제 운영 보드로 바꿔, 우선 조치 건을 바로 확인할 수 있게 만들었습니다."
        icon={Bell}
        badge={{ label: `${unreadCount}개 미확인`, variant: unreadCount > 0 ? 'warning' : 'success' }}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricTile label="미확인 알림" value={`${unreadCount}건`} meta="우선 확인 필요" icon={Bell} tone="rose" />
        <MetricTile label="긴급/높음" value={`${mockAlerts.filter((alert) => alert.severity === 'critical' || alert.severity === 'high').length}건`} meta="오늘 처리 권장" icon={AlertTriangle} tone="amber" />
        <MetricTile label="자동 추천" value={`${mockAlerts.filter((alert) => alert.actionRequired).length}건`} meta="실행 안내 포함" icon={Sparkles} tone="violet" />
      </div>

      <SectionCard
        title="알림 큐"
        description="우선순위별로 정렬된 운영 알림입니다."
        icon={Filter}
        action={
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as typeof filter)}
            className="focus-ring rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[color:var(--text-primary)]"
          >
            <option value="all">전체</option>
            <option value="critical">긴급</option>
            <option value="high">높음</option>
            <option value="medium">보통</option>
            <option value="low">낮음</option>
          </select>
        }
      >
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="rounded-3xl border border-[color:var(--border-subtle)] bg-[var(--surface-strong)] p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-semibold text-[color:var(--text-strong)]">{alert.title}</p>
                    <StatusBadge label={severityLabel(alert.severity)} variant={severityVariant(alert.severity)} />
                    {!alert.read && <StatusBadge label="미확인" variant="processing" />}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-primary)]">{alert.message}</p>
                </div>
                <div className="text-right text-xs text-[color:var(--text-muted)]">
                  <p>{new Date(alert.createdAt).toLocaleDateString('ko-KR')}</p>
                  <p className="mt-1">{alert.elderlyName || '공통 알림'}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {alert.actionRequired ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(71,96,83,0.16)] bg-[rgba(93,119,105,0.12)] px-3 py-1.5 text-sm font-medium text-[color:var(--brand-700)]">
                    <Sparkles className="h-4 w-4" />
                    {alert.actionRequired}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--success-100)] px-3 py-1.5 text-sm font-medium text-[color:var(--success-600)]">
                    <CheckCircle2 className="h-4 w-4" />
                    자동 후속 없음
                  </span>
                )}
                <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(39,53,45,0.05)] px-3 py-1.5 text-sm font-medium text-[color:var(--text-primary)]">
                  <Clock className="h-4 w-4" />
                  운영 큐 대기
                </span>
                <Link
                  to={getAlertTarget(alert)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--action-100)] px-3 py-1.5 text-sm font-medium text-[color:var(--action-700)] transition hover:bg-[rgba(223,244,244,0.92)]"
                >
                  바로 열기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function severityLabel(severity: Alert['severity']) {
  switch (severity) {
    case 'critical':
      return '긴급';
    case 'high':
      return '높음';
    case 'medium':
      return '보통';
    case 'low':
      return '낮음';
  }
}

function severityVariant(severity: Alert['severity']) {
  switch (severity) {
    case 'critical':
      return 'error';
    case 'high':
      return 'warning';
    case 'medium':
      return 'info';
    case 'low':
      return 'success';
  }
}
