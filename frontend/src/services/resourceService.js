import api from './api';

export const resourceService = {
  // Upload resource
  uploadResource: async (resourceData) => {
    const response = await api.post('/resources', resourceData);
    return response.data;
  },

  // Get resources for a match
  getMatchResources: async (matchId) => {
    const response = await api.get(`/resources/match/${matchId}`);
    return response.data;
  },

  // Get single resource
  getResource: async (resourceId) => {
    const response = await api.get(`/resources/${resourceId}`);
    return response.data;
  },

  // Rate resource
  rateResource: async (resourceId, ratingData) => {
    const response = await api.post(`/resources/${resourceId}/rate`, ratingData);
    return response.data;
  },

  // Get user's uploaded resources
  getMyResources: async () => {
    const response = await api.get('/resources/my/uploads');
    return response.data;
  },

  // Delete resource
  deleteResource: async (resourceId) => {
    const response = await api.delete(`/resources/${resourceId}`);
    return response.data;
  }
};
