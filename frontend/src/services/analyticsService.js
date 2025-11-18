import api from './api';

export const analyticsService = {
  // Get dashboard data
  getDashboard: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  // Get swap history
  getSwapHistory: async () => {
    const response = await api.get('/analytics/history');
    return response.data;
  },

  // Get skills breakdown
  getSkillsBreakdown: async () => {
    const response = await api.get('/analytics/skills');
    return response.data;
  },

  // Get monthly stats
  getMonthlyStats: async () => {
    const response = await api.get('/analytics/monthly');
    return response.data;
  },

  // Get activity timeline
  getActivityTimeline: async () => {
    const response = await api.get('/analytics/timeline');
    return response.data;
  }
};
