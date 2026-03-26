import React, { forwardRef } from 'react';
import { theme } from '../../styles/designTokens';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  clickable?: boolean;
  aiAccent?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      hover = false,
      clickable = false,
      aiAccent = false,
      style,
      ...props
    },
    ref
  ) => {
    const paddingMap = {
      none: '0',
      sm: theme.spacing[4],
      md: theme.spacing[6],
      lg: theme.spacing[8],
      xl: theme.spacing[10],
    };

    const getVariantStyles = (): React.CSSProperties => {
      const base: React.CSSProperties = {
        borderRadius: theme.borderRadius['2xl'],
        padding: paddingMap[padding],
        transition: `all ${theme.transitions.duration[300]} ${theme.transitions.timing.inOut}`,
      };

      switch (variant) {
        case 'default':
          return {
            ...base,
            backgroundColor: 'white',
            boxShadow: theme.shadows.md,
            border: '1px solid transparent',
          };
        case 'glass':
          return {
            ...base,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: theme.shadows.lg,
            border: '1px solid rgba(255, 255, 255, 0.3)',
          };
        case 'gradient':
          return {
            ...base,
            background: theme.colors.ai.gradient,
            color: 'white',
            boxShadow: theme.shadows.glow.primary,
          };
        case 'bordered':
          return {
            ...base,
            backgroundColor: 'white',
            border: `2px solid ${theme.colors.gray[200]}`,
            boxShadow: 'none',
          };
        default:
          return base;
      }
    };

    const getHoverStyles = (): React.CSSProperties => {
      if (!hover && !clickable) return {};

      if (variant === 'glass') {
        return {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows.xl,
        };
      }

      if (variant === 'default') {
        return {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows.lg,
          borderColor: aiAccent ? theme.colors.secondary[300] : 'transparent',
        };
      }

      if (variant === 'bordered') {
        return {
          borderColor: theme.colors.primary[300],
          boxShadow: theme.shadows.md,
        };
      }

      return {
        transform: 'translateY(-2px)',
      };
    };

    const styles = getVariantStyles();

    return (
      <div
        ref={ref}
        style={{
          ...styles,
          cursor: clickable ? 'pointer' : 'default',
          ...(aiAccent && variant === 'default' ? { border: `2px solid ${theme.colors.secondary[200]}` } : {}),
          ...style,
        }}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, getHoverStyles());
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, styles);
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
