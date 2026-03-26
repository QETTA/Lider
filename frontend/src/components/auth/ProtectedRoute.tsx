import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthSession } from '../../hooks/useAuthSession';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuthSession();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--page-bg)] px-6">
        <div className="rounded-[28px] border border-[color:var(--border-subtle)] bg-[rgba(255,253,250,0.92)] px-6 py-5 text-sm text-[color:var(--text-primary)] shadow-[0_18px_50px_rgba(39,53,45,0.08)]">
          세션 상태를 확인하는 중입니다.
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
