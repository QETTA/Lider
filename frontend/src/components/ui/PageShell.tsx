import type { HTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { GlassCard, type GlassCardProps } from './GlassCard';
import { StatusBadge } from './StatusBadge';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: {
    label: string;
    variant?: 'default' | 'active' | 'success' | 'warning' | 'error' | 'info' | 'processing' | 'offline';
  };
  actions?: ReactNode;
}

function PageHeader({ eyebrow, title, description, icon: Icon, badge, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <span className="surface-tint inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)] shadow-none">
            {eyebrow}
          </span>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {Icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--border-accent)] bg-[linear-gradient(180deg,rgba(223,244,244,0.95),rgba(255,253,250,0.96))] text-[color:var(--action-700)] shadow-sm">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-[color:var(--text-strong)] md:text-3xl">{title}</h1>
              {badge && <StatusBadge variant={badge.variant || 'info'} label={badge.label} dot={false} />}
            </div>
            {description && <p className="mt-1 text-sm text-[color:var(--text-muted)] md:text-base">{description}</p>}
          </div>
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}

interface SectionCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  variant?: GlassCardProps['variant'];
  contentClassName?: string;
}

function SectionCard({
  title,
  description,
  icon: Icon,
  action,
  variant = 'default',
  className,
  contentClassName,
  children,
  ...props
}: SectionCardProps) {
  return (
    <GlassCard variant={variant} className={cn('p-5 md:p-6', className)} {...props}>
      {(title || description || action) && (
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            {title && (
              <div className="flex items-center gap-2">
                {Icon && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] text-[color:var(--brand-700)]">
                    <Icon className="h-4 w-4" />
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-[color:var(--text-strong)]">{title}</h2>
                  {description && <p className="mt-1 text-sm text-[color:var(--text-muted)]">{description}</p>}
                </div>
              </div>
            )}
            {!title && description && <p className="text-sm text-[color:var(--text-muted)]">{description}</p>}
          </div>
          {action && <div className="flex flex-wrap items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={cn('space-y-4', contentClassName)}>{children}</div>
    </GlassCard>
  );
}

interface MetricTileProps {
  label: string;
  value: string | number;
  meta?: string;
  icon?: LucideIcon;
  tone?: 'sky' | 'violet' | 'emerald' | 'amber' | 'slate' | 'rose';
}

function MetricTile({ label, value, meta, icon: Icon, tone = 'sky' }: MetricTileProps) {
  const toneClasses = {
    sky: 'border-[color:var(--border-accent)] bg-[var(--action-100)] text-[color:var(--action-700)]',
    violet: 'border-[rgba(71,96,83,0.18)] bg-[rgba(93,119,105,0.12)] text-[color:var(--brand-700)]',
    emerald: 'border-transparent bg-[var(--success-100)] text-[color:var(--success-600)]',
    amber: 'border-transparent bg-[var(--warning-100)] text-[color:var(--warning-600)]',
    slate: 'border-[color:var(--border-subtle)] bg-[rgba(39,53,45,0.05)] text-[color:var(--text-primary)]',
    rose: 'border-transparent bg-[var(--danger-100)] text-[color:var(--danger-600)]',
  };

  return (
    <GlassCard className="p-4 md:p-5" hover="lift">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[color:var(--text-muted)]">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-[color:var(--text-strong)]">{value}</p>
          {meta && <p className="mt-2 text-xs text-[color:var(--text-muted)]">{meta}</p>}
        </div>
        {Icon && (
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border',
              toneClasses[tone]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </GlassCard>
  );
}

interface InlineNoticeProps {
  title: string;
  message: string;
  tone?: 'info' | 'success' | 'warning' | 'error';
  action?: ReactNode;
}

function InlineNotice({ title, message, tone = 'info', action }: InlineNoticeProps) {
  const toneClasses = {
    info: 'border-[color:var(--border-accent)] bg-[var(--action-100)] text-[color:var(--action-700)]',
    success: 'border-transparent bg-[var(--success-100)] text-[color:var(--success-600)]',
    warning: 'border-transparent bg-[var(--warning-100)] text-[color:var(--warning-600)]',
    error: 'border-transparent bg-[var(--danger-100)] text-[color:var(--danger-600)]',
  };

  return (
    <div className={cn('rounded-2xl border px-4 py-3 shadow-sm', toneClasses[tone])}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm opacity-80">{message}</p>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export { InlineNotice, MetricTile, PageHeader, SectionCard };
