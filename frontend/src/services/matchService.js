import api from './api';

export const matchService = {
  // Create new match
  createMatch: async (matchData) => {
    const response = await api.post('/matches', matchData);
    return response.data;
  },

  // Get all matches
  getMatches: async (status) => {
    const response = await api.get('/matches', { params: { status } });
    return response.data;
  },

  // Get single match
  getMatch: async (matchId) => {
    const response = await api.get(`/matches/${matchId}`);
    return response.data;
  },

  // Update match status
  updateMatchStatus: async (matchId, status) => {
    const response = await api.put(`/matches/${matchId}/status`, { status });
    return response.data;
  },

  // Update session details
  updateSessionDetails: async (matchId, sessionData) => {
    const response = await api.put(`/matches/${matchId}/session`, sessionData);
    return response.data;
  },

  // Rate match
  rateMatch: async (matchId, ratingData) => {
    const response = await api.post(`/matches/${matchId}/rate`, ratingData);
    return response.data;
  },

  // Add message to match chat
  addMessage: async (matchId, message) => {
    const response = await api.post(`/matches/${matchId}/messages`, { message });
    return response.data;
  }
};
