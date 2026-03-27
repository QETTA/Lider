import { Building2, Cloud, Database, KeyRound, Settings, ShieldCheck, Sparkles } from 'lucide-react';
import { useSystemStatus } from '../hooks/useSystemStatus';
import { InlineNotice, MetricTile, PageHeader, SectionCard, StatusBadge } from '../components/ui';

export function SettingsPage() {
  const { status } = useSystemStatus();
  const isWorkerScope = status.statusScope === 'public-worker';
  const overallBadge =
    status.freshness === 'cached'
      ? { label: '최근 상태 기준', variant: 'info' as const }
      : status.overall === 'healthy'
      ? { label: '연결 정상', variant: 'success' as const }
      : status.overall === 'loading'
        ? { label: '상태 확인 중', variant: 'info' as const }
        : status.overall === 'limited'
          ? { label: '제한적 확인', variant: 'warning' as const }
        : status.overall === 'degraded'
          ? { label: '일부 점검 필요', variant: 'warning' as const }
          : { label: '점검 필요', variant: 'warning' as const };
  const backendMetricLabel =
    status.freshness === 'cached'
      ? '최근 상태 기준'
      : status.overall === 'loading'
        ? '확인 중'
        : isWorkerScope
          ? '응답 확인됨'
        : status.backendOnline
          ? '정상 연결'
          : '연결 안 됨';
  const publicDataKeyLabel =
    status.publicDataApiKeyConfigured === false
      ? '키 미설정'
      : status.publicDataReachable === false
        ? status.freshness === 'cached'
          ? '최근 실패'
          : '연결 실패'
        : status.publicDataReachable === null
          ? isWorkerScope
            ? '미확인'
            : '확인 중'
          : status.freshness === 'cached'
            ? '최근 정상'
            : '연결 가능';
  const publicDataKeyMeta =
    status.publicDataApiKeyConfigured === false
      ? 'API 키 필요'
      : status.publicDataReachable === false
        ? '연결 점검 필요'
        : '키 및 연결 상태';
  const databaseMetricLabel =
    status.databaseConnected === null
      ? isWorkerScope
        ? '미확인'
        : '확인 중'
      : status.freshness === 'cached'
        ? status.databaseConnected
          ? '최근 정상'
          : '최근 점검 필요'
        : status.databaseConnected
          ? '정상'
          : '점검 필요';

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        eyebrow="운영 관리"
        title="운영 설정"
        description="비어 있던 설정 경로를 실제 운영 상태와 연결해, 환경 점검과 API 준비 상태를 한 화면에서 보이도록 만들었습니다."
        icon={Settings}
        badge={overallBadge}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricTile
          label={isWorkerScope ? '공개 Worker' : '백엔드'}
          value={backendMetricLabel}
          meta={
            status.responseTimeMs !== null
              ? `${isWorkerScope ? 'Worker' : 'API'} ${status.responseTimeMs}ms`
              : '응답 대기'
          }
          icon={Cloud}
          tone="sky"
        />
        <MetricTile label="데이터베이스" value={databaseMetricLabel} meta={status.apiVersion ? `API v${status.apiVersion}` : '버전 미확인'} icon={Database} tone="emerald" />
        <MetricTile label="공공데이터 연동" value={publicDataKeyLabel} meta={publicDataKeyMeta} icon={KeyRound} tone="amber" />
      </div>

      {status.isRefreshing && (
        <InlineNotice
          title="운영 상태 다시 확인 중"
          message={
            status.freshness === 'cached'
              ? '최근 확인된 상태를 먼저 보여주고 있으며 최신 상태를 다시 확인하는 중입니다.'
              : '공개 Worker와 연동 상태를 다시 확인하는 중입니다.'
          }
          tone="info"
        />
      )}

      {isWorkerScope && (
        <InlineNotice
          title="공개 Worker 기준 제한적 상태"
          message="현재 same-origin Worker 응답만 확인할 수 있으며, DB와 공공데이터의 실제 운영 상태는 이 배포에서 자동 확정하지 않습니다."
          tone="warning"
        />
      )}

      {status.publicDataApiKeyConfigured === false && (
        <InlineNotice
          title="공공데이터 API 키 미설정"
          message="현재 대시보드와 설정 화면은 정상 동작하지만, 실시간 공공데이터 연동은 키를 넣어야 완성됩니다."
          tone="warning"
        />
      )}

      {status.publicDataReachable === false && status.publicDataApiKeyConfigured !== false && (
        <InlineNotice
          title="공공데이터 연동 점검 필요"
          message="API 키는 확인됐지만 실제 공공데이터 응답이 실패했습니다. 연결 상태를 다시 확인해 주세요."
          tone="warning"
        />
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard title="센터 기본 정보" description="운영자가 가장 자주 확인하는 센터 메타데이터를 별도 카드로 분리했습니다." icon={Building2}>
          <div className="space-y-3">
            <SettingRow label="센터명" value="LIDER" />
            <SettingRow label="운영 모드" value="LIDER MVP / Claude AI Helper" />
            <SettingRow label="최근 상태 점검" value={status.checkedAt ? new Date(status.checkedAt).toLocaleString('ko-KR') : '점검 대기'} />
          </div>
        </SectionCard>

        <SectionCard title="연동 상태" description="백엔드, DB, 공공데이터 연결 상태를 한 카드에서 확인합니다." icon={ShieldCheck} variant="accent">
          <div className="space-y-3">
            <StatusRow
              label={isWorkerScope ? '공개 Worker API' : '백엔드 API'}
              value={
                status.freshness === 'cached'
                  ? '최근 상태 기준'
                  : isWorkerScope
                    ? '응답 확인'
                  : status.backendOnline
                    ? '정상 연결'
                    : '연결 실패'
              }
              variant={
                status.freshness === 'cached'
                  ? 'info'
                  : isWorkerScope
                    ? 'info'
                  : status.backendOnline
                    ? 'success'
                    : 'error'
              }
            />
            <StatusRow
              label="데이터베이스"
              value={
                status.databaseConnected === null
                  ? isWorkerScope
                    ? '미확인'
                    : '확인 중'
                  : status.freshness === 'cached'
                    ? status.databaseConnected
                      ? '최근 정상'
                      : '최근 점검 필요'
                    : status.databaseConnected
                      ? '정상 연결'
                      : '점검 필요'
              }
              variant={
                status.databaseConnected === null
                  ? isWorkerScope
                    ? 'warning'
                    : 'info'
                  : status.freshness === 'cached'
                    ? 'info'
                    : status.databaseConnected
                      ? 'success'
                      : 'warning'
              }
            />
            <StatusRow
              label="공공데이터"
              value={
                status.publicDataApiKeyConfigured === false
                  ? 'API 키 미설정'
                  : status.publicDataReachable === false
                    ? status.freshness === 'cached'
                      ? '최근 실패'
                      : '연결 실패'
                    : status.publicDataReachable === null
                      ? isWorkerScope
                        ? '미확인'
                        : '확인 중'
                      : status.freshness === 'cached'
                        ? '최근 정상'
                        : '연결 가능'
              }
              variant={
                status.publicDataApiKeyConfigured === false
                  ? 'warning'
                  : status.publicDataReachable === false
                    ? status.freshness === 'cached'
                      ? 'info'
                      : 'warning'
                    : status.publicDataReachable === null
                      ? isWorkerScope
                        ? 'warning'
                        : 'info'
                      : status.freshness === 'cached'
                        ? 'info'
                        : 'success'
              }
            />
          </div>
        </SectionCard>

        <SectionCard title="추천 다음 작업" description="현재 MVP를 실사용 단계로 옮기기 전에 우선 처리할 항목입니다." icon={Sparkles}>
          <div className="space-y-3 text-sm text-[color:var(--text-primary)]">
            <div className="rounded-2xl border border-[color:var(--border-accent)] bg-[var(--action-100)] px-4 py-3">대시보드 카드 수치를 `/v1` API 응답으로 교체하면 신뢰도가 가장 크게 올라갑니다.</div>
            <div className="rounded-2xl border border-[rgba(71,96,83,0.12)] bg-[rgba(93,119,105,0.12)] px-4 py-3">문서 업로드와 상담 저장을 실제 백엔드 호출로 연결하면 MVP 데모가 제품에 가까워집니다.</div>
            <div className="rounded-2xl border border-transparent bg-[var(--warning-100)] px-4 py-3 text-[color:var(--warning-600)]">공공데이터 API 키와 운영자 설정을 실제 환경 변수 편집 UI 또는 가이드로 연결할 차례입니다.</div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3">
      <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--text-soft)]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[color:var(--text-strong)]">{value}</p>
    </div>
  );
}

function StatusRow({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant: 'success' | 'warning' | 'error' | 'info';
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3">
      <span className="text-sm font-medium text-[color:var(--text-primary)]">{label}</span>
      <StatusBadge label={value} variant={variant} />
    </div>
  );
}
