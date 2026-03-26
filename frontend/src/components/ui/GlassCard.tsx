import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'large' | 'accent' | 'success' | 'warning' | 'error';
  hover?: 'lift' | 'scale' | 'glow' | 'none';
  interactive?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = 'lift', interactive = false, children, ...props }, ref) => {
    const baseClasses =
      'relative overflow-hidden rounded-[var(--radius-xl)] border transition-all duration-[var(--duration-normal)] ease-[var(--ease-smooth)]';

    const variantClasses = {
      default: 'glass-card',
      dark: 'glass-dark',
      large: 'glass-lg',
      accent:
        'surface-tint border-[color:var(--border-accent)] bg-[linear-gradient(180deg,rgba(242,246,243,0.94),rgba(255,253,250,0.96))]',
      success:
        'surface-paper border-l-4 border-l-[color:var(--success-600)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(231,245,236,0.5))]',
      warning:
        'surface-paper border-l-4 border-l-[color:var(--warning-600)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,244,223,0.56))]',
      error:
        'surface-paper border-l-4 border-l-[color:var(--danger-600)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(253,235,234,0.58))]',
    };

    const hoverClasses = {
      lift: 'hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]',
      scale: 'hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[var(--shadow-card-hover)]',
      glow:
        'hover:border-[color:var(--border-accent)] hover:shadow-[0_0_0_3px_rgba(19,125,128,0.08),var(--shadow-card-hover)]',
      none: '',
    };

    const interactiveClasses = interactive
      ? 'cursor-pointer focus-ring active:translate-y-px'
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          hoverClasses[hover],
          interactiveClasses,
          className
        )}
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
export type { GlassCardProps };
