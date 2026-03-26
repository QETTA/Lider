import type { Alert } from '../types';

export function getUnreadAlertCount(alerts: Alert[]) {
  return alerts.filter((alert) => !alert.read).length;
}
