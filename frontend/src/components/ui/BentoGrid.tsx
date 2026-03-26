import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, columns = 4, gap = 'md', children, ...props }, ref) => {
    const gapClasses = {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid auto-rows-min',
          columns === 2 && 'grid-cols-1 md:grid-cols-2',
          columns === 3 && 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
          columns === 4 && 'grid-cols-2 lg:grid-cols-4',
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BentoGrid.displayName = 'BentoGrid';

interface BentoItemProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'normal' | 'wide' | 'tall' | 'large';
  variant?: 'default' | 'featured' | 'accent';
  hover?: boolean;
}

const BentoItem = forwardRef<HTMLDivElement, BentoItemProps>(
  ({ className, size = 'normal', variant = 'default', hover = true, children, ...props }, ref) => {
    const sizeClasses = {
      normal: '',
      wide: 'col-span-2',
      tall: 'row-span-2',
      large: 'col-span-2 row-span-2',
    };

    const variantClasses = {
      default: 'glass-card',
      featured: 'glass-lg border-[color:var(--border-accent)]',
      accent:
        'surface-tint border-[color:var(--border-accent)] bg-[linear-gradient(180deg,rgba(242,246,243,0.96),rgba(255,253,250,0.94))]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl p-5',
          sizeClasses[size],
          variantClasses[variant],
          hover &&
            'cursor-pointer transition-all duration-[var(--duration-normal)] ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]',
          className
        )}
        {...props}
      >
        <div className="relative z-10 flex h-full flex-col">{children}</div>
      </div>
    );
  }
);

BentoItem.displayName = 'BentoItem';

export { BentoGrid, BentoItem };
export type { BentoGridProps, BentoItemProps };
