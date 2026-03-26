import { useEmotionMode, modeConfig, type EmotionMode } from '../../hooks/useEmotionMode';
import { GlassCard } from './GlassCard';
import { Sparkles } from 'lucide-react';

export function EmotionModeSelector() {
  const { mode, setMode, autoMode, setAutoMode, modeInfo } = useEmotionMode();

  return (
    <GlassCard variant="large" className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-2xl border text-base"
            style={{
              color: modeInfo.color,
              backgroundColor: `${modeInfo.color}14`,
              borderColor: `${modeInfo.color}33`,
            }}
          >
            {modeInfo.icon}
          </span>
          <div>
            <h3 className="font-semibold text-[color:var(--text-strong)]">{modeInfo.label}</h3>
            <p className="text-xs text-[color:var(--text-muted)]">{modeInfo.description}</p>
          </div>
        </div>
        <button
          onClick={() => setAutoMode(!autoMode)}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
            autoMode 
              ? 'border-transparent bg-[var(--action-100)] text-[color:var(--action-700)]'
              : 'border-[color:var(--border-subtle)] bg-[rgba(39,53,45,0.04)] text-[color:var(--text-muted)] hover:bg-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {autoMode ? '자동' : '수동'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {(Object.keys(modeConfig) as EmotionMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            disabled={autoMode}
            className={`relative rounded-xl border p-3 text-center transition-all duration-300 ${
              mode === m
                ? 'border-[color:var(--border-accent)] bg-white shadow-[var(--shadow-card)] scale-[1.02]'
                : 'border-[color:var(--border-subtle)] bg-[var(--surface-soft)] hover:bg-white hover:shadow-[var(--shadow-card)]'
            } ${autoMode ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className="text-2xl mb-1 block">{modeConfig[m].icon}</span>
            <span className="block text-xs font-medium text-[color:var(--text-primary)]">
              {modeConfig[m].label.split(' ')[0]}
            </span>
            {mode === m && (
              <span 
                className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full"
                style={{ backgroundColor: modeConfig[m].color }}
              />
            )}
          </button>
        ))}
      </div>

      {autoMode && (
        <p className="mt-3 text-center text-xs text-[color:var(--text-muted)]">
          시간에 따라 자동으로 모드가 전환됩니다 (05-10시: 아침, 10-17시: 집중, 17-21시: 저녁, 21-05시: 침착)
        </p>
      )}
    </GlassCard>
  );
}
