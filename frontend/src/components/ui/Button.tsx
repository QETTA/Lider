import React, { forwardRef } from 'react';
import { theme } from '../../styles/designTokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost' | 'soft';
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  aiGlow?: boolean;
}

const colorSchemes = {
  primary: theme.colors.primary,
  secondary: theme.colors.secondary,
  success: theme.colors.success,
  warning: theme.colors.warning,
  error: theme.colors.error,
  gray: theme.colors.gray,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'solid',
      colorScheme = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      fullWidth,
      aiGlow,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const colors = colorSchemes[colorScheme];
    const sizeStyles = theme.componentTokens.button.sizes[size];

    const getVariantStyles = () => {
      switch (variant) {
        case 'solid':
          return {
            backgroundColor: colors[600],
            color: 'white',
            border: 'none',
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: colors[600],
            border: `1.5px solid ${colors[300]}`,
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: colors[600],
            border: 'none',
          };
        case 'soft':
          return {
            backgroundColor: colors[100],
            color: colors[700],
            border: 'none',
          };
        default:
          return {};
      }
    };

    const getHoverStyles = () => {
      if (disabled || isLoading) return {};

      switch (variant) {
        case 'solid':
          return { backgroundColor: colors[700] };
        case 'outline':
          return { backgroundColor: colors[50], borderColor: colors[400] };
        case 'ghost':
          return { backgroundColor: colors[100] };
        case 'soft':
          return { backgroundColor: colors[200] };
        default:
          return {};
      }
    };

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontFamily: theme.typography.fontFamily.sans.join(', '),
      fontWeight: theme.typography.fontWeight.medium,
      borderRadius: theme.borderRadius.lg,
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled || isLoading ? 0.6 : 1,
      transition: `all ${theme.transitions.duration[200]} ${theme.transitions.timing.inOut}`,
      width: fullWidth ? '100%' : 'auto',
      ...sizeStyles,
      ...getVariantStyles(),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={baseStyles}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, getHoverStyles());
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, getVariantStyles());
        }}
        {...props}
      >
        {isLoading && (
          <span
            style={{
              display: 'inline-block',
              width: '1em',
              height: '1em',
              border: '2px solid currentColor',
              borderRightColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
