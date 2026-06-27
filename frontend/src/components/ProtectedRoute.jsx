import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SkeletonLoader from './ui/SkeletonLoader';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-4xl p-6"><SkeletonLoader count={3} /></div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  return !user ? <Outlet /> : <Navigate to="/" replace />;
};