import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppState } from '../../context/AppProvider';

export function RequireOnboarding({ children }: { children: ReactNode }) {
  const { profile } = useAppState();
  if (!profile.onboarded) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}
