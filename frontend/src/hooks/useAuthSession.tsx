import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { resolveSameOriginAwareApiBaseUrl } from '../utils/apiBaseUrl';
import {
  AuthSession,
  clearStoredAuthSession,
  fetchCurrentOnboardingProfile,
  fetchCurrentSessionUser,
  getDefaultOnboardingProfile,
  loginWithPassword,
  logoutSession,
  persistAuthSession,
  readStoredAuthSession,
  type UserOnboardingProfile,
  type UserOnboardingProfileInput,
  updateCurrentOnboardingProfile,
} from '../utils/authClient';

interface AuthSessionContextValue {
  apiBaseUrl: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboardingLoading: boolean;
  session: AuthSession | null;
  onboardingProfile: UserOnboardingProfile;
  login: (email: string, password: string) => Promise<AuthSession>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  refreshOnboardingProfile: () => Promise<UserOnboardingProfile>;
  saveOnboardingProfile: (payload: UserOnboardingProfileInput) => Promise<UserOnboardingProfile>;
}

const AuthSessionContext = createContext<AuthSessionContextValue | undefined>(undefined);

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const apiBaseUrl = useMemo(() => resolveSameOriginAwareApiBaseUrl(), []);
  const [session, setSession] = useState<AuthSession | null>(() => readStoredAuthSession());
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(false);
  const [onboardingProfile, setOnboardingProfile] = useState<UserOnboardingProfile>(() => getDefaultOnboardingProfile());

  const loadOnboardingProfile = async (token: string) => {
    try {
      return await fetchCurrentOnboardingProfile(apiBaseUrl, token);
    } catch {
      return getDefaultOnboardingProfile();
    }
  };

  const refreshSession = async () => {
    const storedSession = readStoredAuthSession();
    if (!storedSession) {
      setSession(null);
      setOnboardingProfile(getDefaultOnboardingProfile());
      setIsLoading(false);
      setIsOnboardingLoading(false);
      return;
    }

    setIsOnboardingLoading(true);
    try {
      const [user, profile] = await Promise.all([
        fetchCurrentSessionUser(apiBaseUrl, storedSession.token),
        loadOnboardingProfile(storedSession.token),
      ]);
      const nextSession = {
        token: storedSession.token,
        user,
      };
      persistAuthSession(nextSession);
      setSession(nextSession);
      setOnboardingProfile(profile);
    } catch {
      clearStoredAuthSession();
      setSession(null);
      setOnboardingProfile(getDefaultOnboardingProfile());
    } finally {
      setIsLoading(false);
      setIsOnboardingLoading(false);
    }
  };

  useEffect(() => {
    void refreshSession();
  }, [apiBaseUrl]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setIsOnboardingLoading(true);
    try {
      const nextSession = await loginWithPassword(apiBaseUrl, email, password);
      const nextProfile = await loadOnboardingProfile(nextSession.token);
      setOnboardingProfile(nextProfile);
      setSession(nextSession);
      return nextSession;
    } finally {
      setIsLoading(false);
      setIsOnboardingLoading(false);
    }
  };

  const logout = async () => {
    const token = session?.token;
    clearStoredAuthSession();
    setSession(null);
    setOnboardingProfile(getDefaultOnboardingProfile());
    setIsLoading(false);
    setIsOnboardingLoading(false);

    if (token) {
      await logoutSession(apiBaseUrl, token);
    }
  };

  const refreshOnboardingProfile = async () => {
    const activeToken = session?.token ?? readStoredAuthSession()?.token;
    if (!activeToken) {
      const emptyProfile = getDefaultOnboardingProfile();
      setOnboardingProfile(emptyProfile);
      return emptyProfile;
    }

    setIsOnboardingLoading(true);
    try {
      const nextProfile = await fetchCurrentOnboardingProfile(apiBaseUrl, activeToken);
      setOnboardingProfile(nextProfile);
      return nextProfile;
    } finally {
      setIsOnboardingLoading(false);
    }
  };

  const saveOnboardingProfile = async (payload: UserOnboardingProfileInput) => {
    const activeToken = session?.token ?? readStoredAuthSession()?.token;
    if (!activeToken) {
      throw new Error('로그인이 필요합니다.');
    }

    setIsOnboardingLoading(true);
    try {
      const nextProfile = await updateCurrentOnboardingProfile(apiBaseUrl, activeToken, payload);
      setOnboardingProfile(nextProfile);
      return nextProfile;
    } finally {
      setIsOnboardingLoading(false);
    }
  };

  return (
    <AuthSessionContext.Provider
      value={{
        apiBaseUrl,
        isAuthenticated: Boolean(session?.token),
        isLoading,
        isOnboardingLoading,
        session,
        onboardingProfile,
        login,
        logout,
        refreshSession,
        refreshOnboardingProfile,
        saveOnboardingProfile,
      }}
    >
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);
  if (!context) {
    throw new Error('useAuthSession must be used within AuthSessionProvider');
  }

  return context;
}
