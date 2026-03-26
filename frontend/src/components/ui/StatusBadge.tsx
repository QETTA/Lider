import { cn } from '../../utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-[color:var(--border-subtle)] bg-[rgba(39,53,45,0.05)] text-[color:var(--text-primary)]',
        active: 'border-transparent bg-[var(--success-100)] text-[color:var(--success-600)]',
        success: 'border-transparent bg-[var(--success-100)] text-[color:var(--success-600)]',
        warning: 'border-transparent bg-[var(--warning-100)] text-[color:var(--warning-600)]',
        error: 'border-transparent bg-[var(--danger-100)] text-[color:var(--danger-600)]',
        info: 'border-transparent bg-[var(--info-100)] text-[color:var(--info-600)]',
        processing: 'border-transparent bg-[var(--action-100)] text-[color:var(--action-700)]',
        offline: 'border-[color:var(--border-subtle)] bg-[rgba(100,116,139,0.08)] text-[color:var(--text-muted)]',
      },
      size: {
        sm: 'text-[10px] px-2 py-0.5',
        md: 'text-xs px-2.5 py-1',
        lg: 'text-sm px-3 py-1.5',
      },
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      pulse: false,
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  label: string;
  dot?: boolean;
  className?: string;
}

function StatusBadge({ 
  label, 
  variant = 'default', 
  size = 'md', 
  pulse = false,
  dot = true,
  className 
}: StatusBadgeProps) {
  const dotColors = {
    default: 'bg-[var(--text-muted)]',
    active: 'bg-[var(--success-600)]',
    success: 'bg-[var(--success-600)]',
    warning: 'bg-[var(--warning-600)]',
    error: 'bg-[var(--danger-600)]',
    info: 'bg-[var(--info-600)]',
    processing: 'bg-[var(--action-600)]',
    offline: 'bg-[var(--text-soft)]',
  };

  return (
    <span className={cn(statusBadgeVariants({ variant, size, pulse }), className)}>
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant || 'default'], pulse && 'animate-ping')} />
      )}
      {label}
    </span>
  );
}

export { StatusBadge, statusBadgeVariants };
