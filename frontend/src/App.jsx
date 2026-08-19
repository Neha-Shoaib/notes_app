import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import LandingPage from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotesProvider>
            <Routes>
              {/* General Public Paths */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Fallback routing to catch old /home matches smoothly */}
              <Route path="/home" element={<LandingPage />} />

              {/* Guarded Core Paths (Authenticated Users Only) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              {/* Unauthenticated Forms Paths (Logged-in users get redirected away) */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>
          </NotesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}