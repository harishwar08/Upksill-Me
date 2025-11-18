import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = authService.getToken();
    const storedUser = authService.getStoredUser();
    
    if (token && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success('Registration successful!');
      navigate('/dashboard');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      navigate('/dashboard');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Logged out successfully');
    navigate('/');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
