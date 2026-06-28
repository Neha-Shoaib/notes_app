import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Double check this path matches your folder layout

// 1. Protected Route: Blocks unauthenticated users from entering private sections
export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show a blank screen or a loading spinner while checking authentication token status
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-sm font-medium">
        Loading secure session...
      </div>
    );
  }

  // If not logged in, boot them directly back to the public homepage login portal
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

// 2. Public Route: Redirects logged-in users away from auth forms (Login/Register)
export const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-sm font-medium">
        Loading secure session...
      </div>
    );
  }

  // If already logged in, skip the login forms and drop them straight on the workspace dashboard
  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};