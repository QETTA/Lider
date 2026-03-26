import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type EmotionMode = 'morning' | 'focus' | 'evening' | 'calm';

interface EmotionModeContextType {
  mode: EmotionMode;
  setMode: (mode: EmotionMode) => void;
  autoMode: boolean;
  setAutoMode: (auto: boolean) => void;
  modeInfo: {
    label: string;
    description: string;
    icon: string;
    color: string;
  };
}

const modeConfig: Record<EmotionMode, { label: string; description: string; icon: string; color: string }> = {
  morning: {
    label: '아침 모드',
    description: '오전 업무를 또렷하게 시작하는 정리 톤',
    icon: '◔',
    color: '#8f6c34',
  },
  focus: {
    label: '집중 모드',
    description: '입력과 확인 흐름을 차분하게 유지하는 톤',
    icon: '◎',
    color: '#137d80',
  },
  evening: {
    label: '저녁 모드',
    description: '마감과 점검에 어울리는 안정된 톤',
    icon: '◑',
    color: '#476053',
  },
  calm: {
    label: '침착 모드',
    description: '하루 전체에 무리가 없는 기본 운영 톤',
    icon: '○',
    color: '#5d7769',
  },
};

const EmotionModeContext = createContext<EmotionModeContextType | undefined>(undefined);

export function EmotionModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<EmotionMode>('calm');
  const [autoMode, setAutoMode] = useState(true);

  // Auto-detect mode based on time
  useEffect(() => {
    if (!autoMode) return;

    const detectMode = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 10) return 'morning';
      if (hour >= 10 && hour < 17) return 'focus';
      if (hour >= 17 && hour < 21) return 'evening';
      return 'calm';
    };

    setModeState(detectMode());

    // Check every minute
    const interval = setInterval(() => {
      setModeState(detectMode());
    }, 60000);

    return () => clearInterval(interval);
  }, [autoMode]);

  // Apply mode to document
  useEffect(() => {
    document.documentElement.setAttribute('data-emotion-mode', mode);
  }, [mode]);

  const setMode = (newMode: EmotionMode) => {
    setModeState(newMode);
    if (autoMode) setAutoMode(false);
  };

  return (
    <EmotionModeContext.Provider
      value={{
        mode,
        setMode,
        autoMode,
        setAutoMode,
        modeInfo: modeConfig[mode],
      }}
    >
      {children}
    </EmotionModeContext.Provider>
  );
}

export function useEmotionMode() {
  const context = useContext(EmotionModeContext);
  if (context === undefined) {
    throw new Error('useEmotionMode must be used within EmotionModeProvider');
  }
  return context;
}

export { type EmotionMode, modeConfig };
