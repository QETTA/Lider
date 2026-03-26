import React, { forwardRef } from 'react';
import { theme } from '../../styles/designTokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: {
        height: theme.componentTokens.input.height.sm,
        padding: theme.componentTokens.input.padding.sm,
        fontSize: theme.typography.fontSize.sm,
      },
      md: {
        height: theme.componentTokens.input.height.md,
        padding: theme.componentTokens.input.padding.md,
        fontSize: theme.typography.fontSize.base,
      },
      lg: {
        height: theme.componentTokens.input.height.lg,
        padding: theme.componentTokens.input.padding.lg,
        fontSize: theme.typography.fontSize.lg,
      },
    };

    const inputStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      fontFamily: theme.typography.fontFamily.sans.join(', '),
      borderRadius: theme.borderRadius.lg,
      border: `1.5px solid ${error ? theme.colors.error[300] : theme.colors.gray[300]}`,
      backgroundColor: 'white',
      color: theme.colors.gray[900],
      outline: 'none',
      transition: `all ${theme.transitions.duration[200]} ${theme.transitions.timing.inOut}`,
      ...sizeStyles[size],
    };

    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing[1.5],
      width: fullWidth ? '100%' : 'auto',
    };

    const inputWrapperStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    };

    const iconStyles: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      color: theme.colors.gray[400],
    };

    const labelStyles: React.CSSProperties = {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.gray[700],
    };

    const helperStyles: React.CSSProperties = {
      fontSize: theme.typography.fontSize.sm,
      color: error ? theme.colors.error[600] : theme.colors.gray[500],
    };

    return (
      <div style={containerStyles}>
        {label && <label style={labelStyles}>{label}</label>}
        <div style={inputWrapperStyles}>
          {leftIcon && (
            <span style={{ ...iconStyles, left: theme.spacing[3] }}>
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            style={{
              ...inputStyles,
              paddingLeft: leftIcon ? `calc(${theme.spacing[3]} * 2 + 1.5rem)` : undefined,
              paddingRight: rightIcon ? `calc(${theme.spacing[3]} * 2 + 1.5rem)` : undefined,
              ...style,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = error
                ? theme.colors.error[500]
                : theme.colors.primary[500];
              e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? theme.colors.error[100] : theme.colors.primary[100]}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error
                ? theme.colors.error[300]
                : theme.colors.gray[300];
              e.currentTarget.style.boxShadow = 'none';
            }}
            {...props}
          />
          {rightIcon && (
            <span style={{ ...iconStyles, right: theme.spacing[3] }}>
              {rightIcon}
            </span>
          )}
        </div>
        {(helperText || error) && (
          <span style={helperStyles}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
