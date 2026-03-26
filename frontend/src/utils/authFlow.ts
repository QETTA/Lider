export type AuthFlowStepId = 'login' | 'onboarding' | 'setup';

export interface AuthFlowDraft {
  centerName: string;
  email: string;
  role: string;
  centerType: string;
  teamSize: string;
  onboardingGoals: string[];
  setupPriorities: string[];
  communicationChannel: string;
  handoverNote: string;
}

export const authFlowSteps: Array<{
  id: AuthFlowStepId;
  label: string;
  description: string;
  path: string;
}> = [
  {
    id: 'login',
    label: '로그인',
    description: '센터와 계정 확인',
    path: '/login',
  },
  {
    id: 'onboarding',
    label: '온보딩',
    description: '운영 우선순위 파악',
    path: '/onboarding',
  },
  {
    id: 'setup',
    label: '첫 설정',
    description: '첫 주 환경 준비',
    path: '/setup',
  },
];

const STORAGE_KEY = 'lider-auth-flow-draft';

const defaultDraft: AuthFlowDraft = {
  centerName: '',
  email: '',
  role: '',
  centerType: '',
  teamSize: '',
  onboardingGoals: [],
  setupPriorities: [],
  communicationChannel: '',
  handoverNote: '',
};

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

export function getDefaultAuthFlowDraft(): AuthFlowDraft {
  return {
    ...defaultDraft,
    onboardingGoals: [...defaultDraft.onboardingGoals],
    setupPriorities: [...defaultDraft.setupPriorities],
  };
}

function normalizeDraft(value: unknown): AuthFlowDraft {
  if (!value || typeof value !== 'object') {
    return getDefaultAuthFlowDraft();
  }

  const candidate = value as Partial<AuthFlowDraft>;

  return {
    centerName: typeof candidate.centerName === 'string' ? candidate.centerName : '',
    email: typeof candidate.email === 'string' ? candidate.email : '',
    role: typeof candidate.role === 'string' ? candidate.role : '',
    centerType: typeof candidate.centerType === 'string' ? candidate.centerType : '',
    teamSize: typeof candidate.teamSize === 'string' ? candidate.teamSize : '',
    onboardingGoals: normalizeStringArray(candidate.onboardingGoals),
    setupPriorities: normalizeStringArray(candidate.setupPriorities),
    communicationChannel: typeof candidate.communicationChannel === 'string' ? candidate.communicationChannel : '',
    handoverNote: typeof candidate.handoverNote === 'string' ? candidate.handoverNote : '',
  };
}

export function readAuthFlowDraft(): AuthFlowDraft {
  if (typeof window === 'undefined') {
    return getDefaultAuthFlowDraft();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultAuthFlowDraft();
    }

    return normalizeDraft(JSON.parse(raw));
  } catch {
    return getDefaultAuthFlowDraft();
  }
}

export function writeAuthFlowDraft(partial: Partial<AuthFlowDraft>) {
  const current = readAuthFlowDraft();
  const next = normalizeDraft({
    ...current,
    ...partial,
    onboardingGoals: partial.onboardingGoals ?? current.onboardingGoals,
    setupPriorities: partial.setupPriorities ?? current.setupPriorities,
  });

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return next;
}
