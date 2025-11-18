import api from './api';

export const badgeService = {
  // Get all badges
  getAllBadges: async () => {
    const response = await api.get('/badges');
    return response.data;
  },

  // Get user's badges
  getUserBadges: async (userId) => {
    const response = await api.get(`/badges/user/${userId}`);
    return response.data;
  },

  // Get badge by ID
  getBadge: async (badgeId) => {
    const response = await api.get(`/badges/${badgeId}`);
    return response.data;
  },

  // Get badges by category
  getBadgesByCategory: async (category) => {
    const response = await api.get(`/badges/category/${category}`);
    return response.data;
  }
};
