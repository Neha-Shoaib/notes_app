import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <Routes>
            {/* Guarded Core Paths */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>

            {/* Unauthenticated Forms Paths */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}