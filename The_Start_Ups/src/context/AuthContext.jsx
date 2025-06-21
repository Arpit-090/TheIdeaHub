import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get('/api/auth/user', {
          headers: {
            'x-auth-token': token
          }
        });

        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5173/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    setIsAuthenticated(true);
  };

  const register = async (username, email, password) => {
    const res = await axios.post('http://localhost:5173/auth/register', { username, email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;