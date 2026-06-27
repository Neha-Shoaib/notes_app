import { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await apiRequest('/auth/me');
        if (res.success) setUser(res.user);
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    if (res.success) {
      localStorage.setItem('token', res.token);
      setUser({ _id: res._id, name: res.name, email: res.email });
    }
    return res;
  };

  const register = async (name, email, password) => {
    const res = await apiRequest('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    });
    if (res.success) {
      localStorage.setItem('token', res.token);
      setUser({ _id: res._id, name: res.name, email: res.email });
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);