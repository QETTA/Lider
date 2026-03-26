import { HeartHandshake } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BrandMarkProps {
  title?: string;
  caption?: string;
  mobileCaption?: string;
  className?: string;
}

export function BrandMark({
  title = 'LIDER',
  caption,
  mobileCaption,
  className,
}: BrandMarkProps) {
  const resolvedMobileCaption = mobileCaption ?? caption;

  return (
    <div className={cn('brand-mark', className)}>
      <span className="brand-mark-badge" aria-hidden="true">
        <HeartHandshake className="h-5 w-5" />
      </span>

      <span className="min-w-0">
        <span className="brand-mark-title">{title}</span>

        {resolvedMobileCaption && resolvedMobileCaption !== caption ? (
          <>
            <span className="brand-mark-copy sm:hidden">{resolvedMobileCaption}</span>
            {caption ? <span className="brand-mark-copy hidden sm:block">{caption}</span> : null}
          </>
        ) : caption ? (
          <span className="brand-mark-copy">{caption}</span>
        ) : null}
      </span>
    </div>
  );
}
