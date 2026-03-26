/**
 * LIDER Design System Tokens
 * AI 업무 오케스트레이션 플랫폼 디자인 토큰
 */

// ==================== Colors ====================
export const colors = {
  // Primary Palette
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },

  // Secondary (Purple for AI)
  secondary: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7C3AED',
    800: '#6B21A8',
    900: '#581C87',
    950: '#3B0764',
  },

  // Semantic Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
  },

  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },

  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },

  // Neutral / Gray Scale
  gray: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },

  // AI-specific accents
  ai: {
    gradient: 'linear-gradient(135deg, #9333EA 0%, #3B82F6 100%)',
    glow: 'rgba(147, 51, 234, 0.3)',
    pulse: 'rgba(59, 130, 246, 0.4)',
  },
};

// ==================== Typography ====================
export const typography = {
  fontFamily: {
    sans: ['Inter', 'Pretendard', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    display: ['Inter', 'Pretendard', 'system-ui', 'sans-serif'],
  },

  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// ==================== Spacing ====================
export const spacing = {
  0: '0',
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
};

// ==================== Border Radius ====================
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// ==================== Shadows ====================
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

  // AI-specific glows
  glow: {
    primary: '0 0 20px rgba(147, 51, 234, 0.3)',
    secondary: '0 0 20px rgba(59, 130, 246, 0.3)',
    success: '0 0 20px rgba(34, 197, 94, 0.3)',
  },
};

// ==================== Transitions ====================
export const transitions = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },

  timing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// ==================== Z-Index ====================
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
  aiAssistant: 1900,
};

// ==================== Breakpoints ====================
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ==================== Animations ====================
export const animations = {
  keyframes: {
    fadeIn: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    slideUp: `
      @keyframes slideUp {
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `,
    pulse: `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `,
    shimmer: `
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `,
    typing: `
      @keyframes typing {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
    `,
    bounce: `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-25%); }
      }
    `,
    spin: `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
  },

  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};

// ==================== Component Tokens ====================
export const componentTokens = {
  button: {
    sizes: {
      xs: { height: '1.5rem', padding: '0 0.5rem', fontSize: '0.75rem' },
      sm: { height: '2rem', padding: '0 0.75rem', fontSize: '0.875rem' },
      md: { height: '2.5rem', padding: '0 1rem', fontSize: '0.875rem' },
      lg: { height: '3rem', padding: '0 1.5rem', fontSize: '1rem' },
      xl: { height: '3.5rem', padding: '0 2rem', fontSize: '1.125rem' },
    },

    variants: {
      solid: {
        primary: {
          bg: colors.primary[600],
          color: 'white',
          hoverBg: colors.primary[700],
          activeBg: colors.primary[800],
        },
        secondary: {
          bg: colors.secondary[600],
          color: 'white',
          hoverBg: colors.secondary[700],
          activeBg: colors.secondary[800],
        },
      },

      outline: {
        border: `1px solid ${colors.gray[300]}`,
        color: colors.gray[700],
        hoverBorder: colors.gray[400],
        hoverBg: colors.gray[50],
      },

      ghost: {
        color: colors.gray[600],
        hoverBg: colors.gray[100],
        hoverColor: colors.gray[900],
      },
    },
  },

  card: {
    padding: spacing[6],
    borderRadius: borderRadius.xl,
    shadow: shadows.md,
    hoverShadow: shadows.lg,
    bg: 'white',
  },

  input: {
    height: {
      sm: '2rem',
      md: '2.5rem',
      lg: '3rem',
    },
    padding: {
      sm: '0 0.625rem',
      md: '0 0.875rem',
      lg: '0 1rem',
    },
    borderRadius: borderRadius.lg,
    borderColor: colors.gray[300],
    focusBorderColor: colors.primary[500],
    focusRing: `0 0 0 3px ${colors.primary[100]}`,
  },

  ai: {
    bubble: {
      user: {
        bg: colors.primary[600],
        color: 'white',
        borderRadius: `${borderRadius['2xl']} ${borderRadius['2xl']} 0 ${borderRadius['2xl']}`,
      },
      assistant: {
        bg: colors.gray[100],
        color: colors.gray[900],
        borderRadius: `${borderRadius['2xl']} ${borderRadius['2xl']} ${borderRadius['2xl']} 0`,
      },
    },
    typingIndicator: {
      dotSize: '8px',
      dotColor: colors.secondary[500],
      animationDuration: '1.4s',
    },
  },
};

// ==================== Theme Export ====================
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  animations,
  componentTokens,
};

export default theme;
