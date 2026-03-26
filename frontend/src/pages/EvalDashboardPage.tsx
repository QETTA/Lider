import React, { useEffect, useState } from 'react';
import { theme } from '../styles/designTokens';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface QualityMetrics {
  jsonValidRate: number;
  extractFieldF1: number;
  wrongToolRate: number;
  groundedAnswerRate: number;
  fallbackRate: number;
  latencyP50: number;
  latencyP95: number;
  costPerRequest: number;
  timestamp: string;
}

interface GoldenSetSummary {
  total: number;
  passed: number;
  failed: number;
  lastRunAt: string;
}

interface BadcaseSummary {
  open: number;
  byCategory: Record<string, number>;
  bySeverity: Record<string, number>;
}

export const EvalDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<QualityMetrics | null>(null);
  const [goldenSet, setGoldenSet] = useState<GoldenSetSummary | null>(null);
  const [badcases, setBadcases] = useState<BadcaseSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/v1/eval/dashboard');
      const data = await response.json();

      if (data.success) {
        setMetrics(data.data.currentMetrics);
        setGoldenSet(data.data.goldenSetSummary);
        setBadcases(data.data.badcaseSummary);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    }
  };

  const runGoldenSetTests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/eval/golden-set/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (data.success) {
        setGoldenSet(data.data.summary);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Failed to run golden set tests:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000); // 1분마다 갱신
    return () => clearInterval(interval);
  }, []);

  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatLatency = (ms: number) => `${ms}ms`;
  const formatCost = (cost: number) => `$${cost.toFixed(6)}`;

  const containerStyles: React.CSSProperties = {
    padding: theme.spacing[6],
    backgroundColor: theme.colors.gray[50],
    minHeight: '100vh',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[6],
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing[4],
    marginBottom: theme.spacing[6],
  };

  const metricCardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const metricLabelStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[500],
    marginBottom: theme.spacing[2],
  };

  const metricValueStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
  };

  const getMetricColor = (value: number, threshold: number, higherIsBetter = true): string => {
    if (higherIsBetter) {
      return value >= threshold ? theme.colors.success[600] : theme.colors.warning[600];
    }
    return value <= threshold ? theme.colors.success[600] : theme.colors.warning[600];
  };

  const sectionsGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing[4],
  };

  return (
    <div style={containerStyles}>
      <header style={headerStyles}>
        <div>
          <h1 style={titleStyles}>AI 품질 대시보드</h1>
          <p style={{ color: theme.colors.gray[500], marginTop: theme.spacing[1] }}>
            Eval & Ops - Golden Set 테스트 및 품질 메트릭 모니터링
          </p>
        </div>
        <div style={{ display: 'flex', gap: theme.spacing[3], alignItems: 'center' }}>
          {lastUpdated && (
            <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.gray[500] }}>
              마지막 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
            </span>
          )}
          <Button
            onClick={runGoldenSetTests}
            isLoading={isLoading}
            leftIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            }
          >
            Golden Set 테스트 실행
          </Button>
          <Button variant="outline" onClick={fetchDashboardData}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
            </svg>
          </Button>
        </div>
      </header>

      {/* 핵심 메트릭 카드 */}
      <div style={gridStyles}>
        <Card>
          <div style={metricCardStyles}>
            <span style={metricLabelStyles}>JSON Valid Rate</span>
            <span
              style={{
                ...metricValueStyles,
                color: getMetricColor(metrics?.jsonValidRate || 0, 0.98),
              }}
            >
              {metrics ? formatPercent(metrics.jsonValidRate) : '-'}
            </span>
            <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.gray[400] }}>
              목표: 98%+
            </span>
          </div>
        </Card>

        <Card>
          <div style={metricCardStyles}>
            <span style={metricLabelStyles}>Grounded Answer Rate</span>
            <span
              style={{
                ...metricValueStyles,
                color: getMetricColor(metrics?.groundedAnswerRate || 0, 0.95),
              }}
            >
              {metrics ? formatPercent(metrics.groundedAnswerRate) : '-'}
            </span>
            <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.gray[400] }}>
              목표: 95%+
            </span>
          </div>
        </Card>

        <Card>
          <div style={metricCardStyles}>
            <span style={metricLabelStyles}>Fallback Rate</span>
            <span
              style={{
                ...metricValueStyles,
                color: getMetricColor(metrics?.fallbackRate || 0, 0.2, false),
              }}
            >
              {metrics ? formatPercent(metrics.fallbackRate) : '-'}
            </span>
            <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.gray[400] }}>
              목표: &lt;20%
            </span>
          </div>
        </Card>

        <Card>
          <div style={metricCardStyles}>
            <span style={metricLabelStyles}>Avg Latency (P50)</span>
            <span style={metricValueStyles}>
              {metrics ? formatLatency(metrics.latencyP50) : '-'}
            </span>
            <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.gray[400] }}>
              목표: &lt;2000ms
            </span>
          </div>
        </Card>
      </div>

      <div style={sectionsGridStyles}>
        {/* Golden Set 섹션 */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing[4] }}>
            <h3 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold }}>
              Golden Set 테스트
            </h3>
            <span
              style={{
                padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                backgroundColor: goldenSet && goldenSet.failed === 0 ? theme.colors.success[100] : theme.colors.warning[100],
                color: goldenSet && goldenSet.failed === 0 ? theme.colors.success[700] : theme.colors.warning[700],
                borderRadius: theme.borderRadius.md,
                fontSize: theme.typography.fontSize.sm,
              }}
            >
              {goldenSet ? `${goldenSet.passed}/${goldenSet.total} 통과` : '로딩 중...'}
            </span>
          </div>

          {goldenSet && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
              <div
                style={{
                  height: '8px',
                  backgroundColor: theme.colors.gray[100],
                  borderRadius: theme.borderRadius.full,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(goldenSet.passed / goldenSet.total) * 100}%`,
                    backgroundColor: goldenSet.failed === 0 ? theme.colors.success[500] : theme.colors.warning[500],
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: theme.typography.fontSize.sm }}>
                <span style={{ color: theme.colors.success[600] }}>통과: {goldenSet.passed}</span>
                <span style={{ color: goldenSet.failed > 0 ? theme.colors.error[600] : theme.colors.gray[400] }}>
                  실패: {goldenSet.failed}
                </span>
              </div>
              <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.gray[500] }}>
                마지막 실행: {new Date(goldenSet.lastRunAt).toLocaleString('ko-KR')}
              </p>
            </div>
          )}
        </Card>

        {/* Badcase 섹션 */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing[4] }}>
            <h3 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold }}>
              Badcase 현황
            </h3>
            <span
              style={{
                padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
                backgroundColor: badcases && badcases.open === 0 ? theme.colors.success[100] : theme.colors.error[100],
                color: badcases && badcases.open === 0 ? theme.colors.success[700] : theme.colors.error[700],
                borderRadius: theme.borderRadius.md,
                fontSize: theme.typography.fontSize.sm,
              }}
            >
              {badcases ? `${badcases.open}개 미해결` : '로딩 중...'}
            </span>
          </div>

          {badcases && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: theme.spacing[2] }}>
                {Object.entries(badcases.byCategory).map(([category, count]) => (
                  <div
                    key={category}
                    style={{
                      padding: theme.spacing[3],
                      backgroundColor: theme.colors.gray[50],
                      borderRadius: theme.borderRadius.md,
                    }}
                  >
                    <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.gray[500], textTransform: 'uppercase' }}>
                      {category}
                    </div>
                    <div style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.bold }}>
                      {count}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" colorScheme="gray" fullWidth>
                모든 Badcase 보기 →
              </Button>
            </div>
          )}
        </Card>

        {/* 비용 분석 */}
        <Card>
          <h3 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing[4] }}>
            비용 분석
          </h3>
          {metrics && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: theme.colors.gray[600] }}>Request당 평균 비용</span>
                <span style={{ fontWeight: theme.typography.fontWeight.semibold }}>
                  {formatCost(metrics.costPerRequest)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: theme.colors.gray[600] }}>예상 월간 비용 (1M requests)</span>
                <span style={{ fontWeight: theme.typography.fontWeight.semibold }}>
                  ${(metrics.costPerRequest * 1000000).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </Card>

        {/* 알람 상태 */}
        <Card aiAccent>
          <h3 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing[4] }}>
            품질 알람
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing[3],
                padding: theme.spacing[3],
                backgroundColor: theme.colors.success[50],
                borderRadius: theme.borderRadius.md,
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: theme.colors.success[500],
                }}
              />
              <span style={{ fontSize: theme.typography.fontSize.sm }}>모든 시스템 정상 작동 중</span>
            </div>
            <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.gray[500] }}>
              임계값 초과 시 Slack/PagerDuty로 알림이 전송됩니다.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EvalDashboardPage;
