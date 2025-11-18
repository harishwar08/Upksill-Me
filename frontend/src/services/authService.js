import api from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    // Hardcoded credentials for demo
    const validEmail = 'harishwar@upskillme.com';
    const validPassword = '321654';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (credentials.email === validEmail && credentials.password === validPassword) {
      const mockUser = {
        id: 1,
        name: 'Harishwar Goud',
        email: 'harishwar@upskillme.com',
        avatar: 'H'
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { token: mockToken, user: mockUser };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Update password
  updatePassword: async (passwords) => {
    const response = await api.put('/auth/updatepassword', passwords);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
