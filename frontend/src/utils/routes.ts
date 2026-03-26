import type { Alert } from '../types';

function buildQuery(params: Record<string, string | undefined>) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });

  const search = query.toString();
  return search ? `?${search}` : '';
}

export function buildDocumentsPath(elderlyId?: string) {
  return `/documents${buildQuery({ elderlyId })}`;
}

export function buildElderlyPath(elderlyId?: string, tab?: 'overview' | 'records' | 'documents' | 'handover') {
  return `/elderly${buildQuery({ elderlyId, tab })}`;
}

export function getAlertTarget(alert: Alert) {
  if (alert.type === 'document_missing' || alert.type === 'evaluation_due') {
    return buildDocumentsPath(alert.elderlyId);
  }

  if (alert.type === 'handover_gap') {
    return buildElderlyPath(alert.elderlyId, 'handover');
  }

  return '/dashboard';
}
