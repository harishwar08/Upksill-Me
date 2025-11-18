import api from './api';

export const notificationService = {
  // Get user's notifications
  getNotifications: async (params) => {
    const response = await api.get('/notifications', { params });
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread/count');
    return response.data;
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  },

  // Clear read notifications
  clearReadNotifications: async () => {
    const response = await api.delete('/notifications/clear-read');
    return response.data;
  }
};
