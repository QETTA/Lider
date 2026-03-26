export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: string;
  center: null | {
    id: string;
    name: string;
    code: string;
    type: string;
  };
}

export interface AuthSession {
  token: string;
  user: AuthenticatedUser;
}

export interface UserOnboardingProfile {
  role: string;
  roleContext: string;
  centerType: string;
  teamSize: string;
  onboardingGoals: string[];
  setupPriorities: string[];
  communicationChannel: string;
  handoverNote: string;
  completedAt: string | null;
}

export interface UserOnboardingProfileInput {
  role?: string;
  roleContext?: string;
  centerType?: string;
  teamSize?: string;
  onboardingGoals?: string[];
  setupPriorities?: string[];
  communicationChannel?: string;
  handoverNote?: string;
  completedAt?: string | null;
}

const AUTH_SESSION_STORAGE_KEY = 'lider.auth.session.v1';

async function parseApiResponse<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => null);
  if (!response.ok || !body?.success || !body?.data) {
    throw new Error(body?.error?.message || '요청을 처리하지 못했습니다.');
  }

  return body.data as T;
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

export function getDefaultOnboardingProfile(): UserOnboardingProfile {
  return {
    role: '',
    roleContext: '',
    centerType: '',
    teamSize: '',
    onboardingGoals: [],
    setupPriorities: [],
    communicationChannel: '',
    handoverNote: '',
    completedAt: null,
  };
}

function normalizeOnboardingProfile(value: unknown): UserOnboardingProfile {
  if (!value || typeof value !== 'object') {
    return getDefaultOnboardingProfile();
  }

  const candidate = value as Partial<UserOnboardingProfile>;

  return {
    role: typeof candidate.role === 'string' ? candidate.role : '',
    roleContext: typeof candidate.roleContext === 'string' ? candidate.roleContext : '',
    centerType: typeof candidate.centerType === 'string' ? candidate.centerType : '',
    teamSize: typeof candidate.teamSize === 'string' ? candidate.teamSize : '',
    onboardingGoals: normalizeStringArray(candidate.onboardingGoals),
    setupPriorities: normalizeStringArray(candidate.setupPriorities),
    communicationChannel: typeof candidate.communicationChannel === 'string' ? candidate.communicationChannel : '',
    handoverNote: typeof candidate.handoverNote === 'string' ? candidate.handoverNote : '',
    completedAt: typeof candidate.completedAt === 'string' ? candidate.completedAt : null,
  };
}

export function readStoredAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<AuthSession>;
    if (!parsed?.token || !parsed.user?.id) {
      return null;
    }

    return {
      token: parsed.token,
      user: parsed.user as AuthenticatedUser,
    };
  } catch {
    return null;
  }
}

export function persistAuthSession(session: AuthSession) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredAuthSession() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
}

export async function loginWithPassword(apiBaseUrl: string, email: string, password: string): Promise<AuthSession> {
  const response = await fetch(`${apiBaseUrl}/v1/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await parseApiResponse<{ token: string; user: AuthenticatedUser }>(response);
  const session = {
    token: data.token,
    user: data.user,
  };
  persistAuthSession(session);
  return session;
}

export async function fetchCurrentSessionUser(apiBaseUrl: string, token: string): Promise<AuthenticatedUser> {
  const response = await fetch(`${apiBaseUrl}/v1/auth/me`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const data = await parseApiResponse<{ user: AuthenticatedUser }>(response);
  return data.user;
}

export async function fetchCurrentOnboardingProfile(apiBaseUrl: string, token: string): Promise<UserOnboardingProfile> {
  const response = await fetch(`${apiBaseUrl}/v1/auth/onboarding`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const data = await parseApiResponse<{ onboarding: unknown }>(response);
  return normalizeOnboardingProfile(data.onboarding);
}

export async function updateCurrentOnboardingProfile(
  apiBaseUrl: string,
  token: string,
  payload: UserOnboardingProfileInput
): Promise<UserOnboardingProfile> {
  const response = await fetch(`${apiBaseUrl}/v1/auth/onboarding`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await parseApiResponse<{ onboarding: unknown }>(response);
  return normalizeOnboardingProfile(data.onboarding);
}

export async function logoutSession(apiBaseUrl: string, token: string) {
  await fetch(`${apiBaseUrl}/v1/auth/logout`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).catch(() => undefined);
}
