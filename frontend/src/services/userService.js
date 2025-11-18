import api from './api';

export const userService = {
  // Get user profile
  getUserProfile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  // Get all users
  getUsers: async (params) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // Search users
  searchUsers: async (query) => {
    const response = await api.get('/users/search', { params: { query } });
    return response.data;
  },

  // Get user matches
  getUserMatches: async () => {
    const response = await api.get('/users/matches');
    return response.data;
  },

  // Delete account
  deleteAccount: async () => {
    const response = await api.delete('/users/account');
    return response.data;
  }
};
