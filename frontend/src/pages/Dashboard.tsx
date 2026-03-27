import { useState, useEffect } from 'react';
import {
  Users,
  FileCheck,
  AlertTriangle,
  Smartphone,
  Brain,
  TrendingUp,
  Clock,
  ChevronRight,
  Bell,
} from 'lucide-react';
import { mockDashboardStats, mockDocumentCompleteness } from '../data/mockData';
import type { Alert, WorkerStat } from '../types';

// 알림 심각도별 색상
const severityColors = {
  critical: 'bg-red-100 text-red-700 border-red-300',
  high: 'bg-orange-100 text-orange-700 border-orange-300',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  low: 'bg-blue-100 text-blue-700 border-blue-300',
};

// 알림 타입별 아이콘/라벨
const alertTypeConfig = {
  evaluation_due: { icon: FileCheck, label: '평가 만료' },
  document_missing: { icon: AlertTriangle, label: '서류 미비' },
  abnormal_vital: { icon: TrendingUp, label: '건강 이상' },
  handover_gap: { icon: Clock, label: '핸드오버' },
  system: { icon: Bell, label: '시스템' },
};

export function Dashboard() {
  const [stats, setStats] = useState(mockDashboardStats);
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

  // 실시간 알림 효과 (시뮬레이션)
  useEffect(() => {
    const interval = setInterval(() => {
      // 알림 갯수 무작위 변동 (데모용)
      setStats((prev) => ({
        ...prev,
        todayVisitsCompleted: Math.min(prev.todayVisitsTotal, prev.todayVisitsCompleted + (Math.random() > 0.7 ? 1 : 0)),
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // 위험도 높은 문서 현황
  const criticalDocs = mockDocumentCompleteness.filter((d) => d.riskLevel === 'critical' || d.riskLevel === 'high');

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">센터 현황 대시보드</h1>
          <p className="text-gray-500 mt-1">실시간 케어 현황 및 평가 문서 관리</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">오늘</option>
            <option value="week">이번 주</option>
            <option value="month">이번 달</option>
          </select>
          <span className="text-sm text-gray-500">
            마지막 업데이트: {new Date().toLocaleTimeString('ko-KR')}
          </span>
        </div>
      </div>

      {/* 핵심 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="등록 어르신"
          value={stats.totalElderly}
          subtitle={`오늘 활동 ${stats.activeToday}명`}
          icon={Users}
          color="blue"
          trend="+2"
        />
        <StatCard
          title="오늘 방문 완료"
          value={`${stats.todayVisitsCompleted}/${stats.todayVisitsTotal}`}
          subtitle={`${Math.round((stats.todayVisitsCompleted / stats.todayVisitsTotal) * 100)}% 완료율`}
          icon={Smartphone}
          color="green"
          trend="진행중"
        />
        <StatCard
          title="평가 문서 미비"
          value={stats.missingDocuments}
          subtitle={`${stats.pendingEvaluations}건 평가 예정`}
          icon={FileCheck}
          color="orange"
          alert={stats.missingDocuments > 10}
        />
        <StatCard
          title="AI 초안 생성"
          value={stats.aiDraftsGenerated}
          subtitle={`정확도 ${stats.aiDraftAccuracy}%`}
          icon={Brain}
          color="purple"
          trend="+12"
        />
      </div>

      {/* 주요 알림 및 문서 현황 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 알림 목록 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              주요 알림
              {stats.recentAlerts.filter((a) => !a.read).length > 0 && (
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                  {stats.recentAlerts.filter((a) => !a.read).length}개 미확인
                </span>
              )}
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">전체보기</button>
          </div>
          <div className="space-y-3">
            {stats.recentAlerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* 긴급 문서 현황 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              긴급 문서 보충 필요
            </h2>
            <span className="text-sm text-red-600 font-medium">{criticalDocs.length}건 긴급</span>
          </div>
          <div className="space-y-3">
            {criticalDocs.map((doc) => (
              <div
                key={doc.elderlyId}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      doc.riskLevel === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {doc.completionRate}%
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{doc.elderlyName} 어르신</p>
                    <p className="text-sm text-gray-500">
                      {doc.missingCritical.length}개 문서 누락 · 평가일 {doc.dueDate}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
            {criticalDocs.length === 0 && (
              <p className="text-center text-gray-500 py-4">긴급 문서 보충 필요 없음</p>
            )}
          </div>
        </div>
      </div>

      {/* 직원 활동 현황 */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-4">오늘의 직원 활동</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">직원</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">방문 수</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">기록 완료</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">평균 시간</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">미완료</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">상태</th>
              </tr>
            </thead>
            <tbody>
              {stats.workerStats.map((worker) => (
                <tr key={worker.workerId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-700">
                        {worker.workerName[0]}
                      </div>
                      <span className="font-medium text-gray-900">{worker.workerName}</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4 text-gray-700">{worker.todayVisits}</td>
                  <td className="text-center py-3 px-4">
                    <span className="text-green-600 font-medium">{worker.recordsCompleted}</span>
                    <span className="text-gray-400"> / {worker.todayVisits}</span>
                  </td>
                  <td className="text-center py-3 px-4 text-gray-700">{worker.avgRecordTime}분</td>
                  <td className="text-center py-3 px-4">
                    {worker.pendingTasks > 0 ? (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                        {worker.pendingTasks}건
                      </span>
                    ) : (
                      <span className="text-green-600">완료</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    <WorkerStatusBadge status={worker.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 빠른 액션 버튼 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickActionButton label="현장 기록 입력" path="/mobile-entry" color="blue" />
        <QuickActionButton label="AI 상담 초안" path="/consultation" color="purple" />
        <QuickActionButton label="평가 문서 확인" path="/documents" color="orange" />
        <QuickActionButton label="어르신 관리" path="/elderly" color="green" />
      </div>
    </div>
  );
}

// 서브 컴포넌트
function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
  alert,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
  trend?: string;
  alert?: boolean;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className={`bg-white rounded-xl border ${alert ? 'border-red-300' : 'border-gray-200'} p-5 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-sm">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-green-600 font-medium">{trend}</span>
          <span className="text-gray-400">vs 어제</span>
        </div>
      )}
    </div>
  );
}

function AlertItem({ alert }: { alert: Alert }) {
  const config = alertTypeConfig[alert.type];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border ${severityColors[alert.severity]} ${
        alert.read ? 'opacity-60' : ''
      }`}
    >
      <div className="p-2 bg-white/50 rounded-lg">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-0.5 bg-white/50 rounded">{config.label}</span>
          <span className="text-xs text-gray-500">{new Date(alert.createdAt).toLocaleTimeString('ko-KR')}</span>
        </div>
        <p className="font-medium text-sm mt-1">{alert.title}</p>
        <p className="text-sm opacity-80 truncate">{alert.message}</p>
        {alert.actionRequired && (
          <p className="text-xs mt-1 font-medium">⚡ {alert.actionRequired}</p>
        )}
      </div>
      {!alert.read && <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2" />}
    </div>
  );
}

function WorkerStatusBadge({ status }: { status: WorkerStat['status'] }) {
  const configs = {
    active: { class: 'bg-green-100 text-green-700', label: '근무중' },
    inactive: { class: 'bg-gray-100 text-gray-600', label: '퇴근' },
    on_leave: { class: 'bg-orange-100 text-orange-700', label: '휴가' },
  };
  const config = configs[status];

  return (
    <span className={`px-2 py-1 text-sm rounded-full ${config.class}`}>{config.label}</span>
  );
}

function QuickActionButton({ label, path, color }: { label: string; path: string; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
    green: 'bg-green-600 hover:bg-green-700',
  };

  return (
    <a
      href={path}
      className={`${colorClasses[color]} text-white font-medium py-3 px-4 rounded-lg text-center transition-colors shadow-sm hover:shadow-md`}
    >
      {label}
    </a>
  );
}
