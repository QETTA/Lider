/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-display)', 'MaruBuri', 'Iowan Old Style', 'Georgia', 'serif'],
      },
      colors: {
        // LIDER Oatmeal + Catalyst Design System
        canvas: {
          DEFAULT: 'var(--canvas)',
          muted: 'var(--canvas-muted)',
          soft: 'var(--canvas-soft)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          strong: 'var(--surface-strong)',
          soft: 'var(--surface-soft)',
          tint: 'var(--surface-tint)',
          overlay: 'var(--surface-overlay)',
        },
        brand: {
          900: 'var(--brand-900)',
          800: 'var(--brand-800)',
          700: 'var(--brand-700)',
          600: 'var(--brand-600)',
          500: 'var(--brand-500)',
        },
        action: {
          700: 'var(--action-700)',
          600: 'var(--action-600)',
          500: 'var(--action-500)',
          100: 'var(--action-100)',
        },
        text: {
          strong: 'var(--text-strong)',
          primary: 'var(--text-primary)',
          muted: 'var(--text-muted)',
          soft: 'var(--text-soft)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
          accent: 'var(--border-accent)',
          overlay: 'var(--border-overlay)',
        },
        success: {
          600: 'var(--success-600)',
          100: 'var(--success-100)',
        },
        warning: {
          600: 'var(--warning-600)',
          100: 'var(--warning-100)',
        },
        danger: {
          600: 'var(--danger-600)',
          100: 'var(--danger-100)',
        },
        info: {
          600: 'var(--info-600)',
          100: 'var(--info-100)',
        },
        emotion: {
          accent: 'var(--emotion-accent)',
          surface: 'var(--emotion-surface)',
          border: 'var(--emotion-border)',
        },
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '14': 'var(--space-14)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'float': 'var(--shadow-float)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.12)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'focus': '0 0 0 3px var(--focus-ring)',
        'focus-strong': '0 0 0 3px var(--focus-ring-strong)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--ease-smooth)',
        'soft': 'var(--ease-soft)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(19, 125, 128, 0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(19, 125, 128, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
