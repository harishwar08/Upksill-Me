import api from './api';

export const requestService = {
  // Create new request
  createRequest: async (requestData) => {
    const response = await api.post('/requests', requestData);
    return response.data;
  },

  // Get all requests
  getRequests: async (params) => {
    const response = await api.get('/requests', { params });
    return response.data;
  },

  // Get single request
  getRequest: async (requestId) => {
    const response = await api.get(`/requests/${requestId}`);
    return response.data;
  },

  // Get user's requests
  getMyRequests: async () => {
    const response = await api.get('/requests/my/all');
    return response.data;
  },

  // Update request
  updateRequest: async (requestId, requestData) => {
    const response = await api.put(`/requests/${requestId}`, requestData);
    return response.data;
  },

  // Delete request
  deleteRequest: async (requestId) => {
    const response = await api.delete(`/requests/${requestId}`);
    return response.data;
  },

  // Search requests
  searchRequests: async (query) => {
    const response = await api.get('/requests/search', { params: { query } });
    return response.data;
  }
};
