
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  // Wait for redux-persist to rehydrate before making an auth decision.
  // Without this, a page refresh kicks users to /login even if they were logged in.
  const rehydrated = useAppSelector(state => (state as any)._persist?.rehydrated ?? true);

  if (!rehydrated) {
    // Still loading persisted state — show nothing (PersistGate handles this too,
    // but belt-and-suspenders for any race conditions)
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
