import { api } from '../../../api';

export const getAuthUsers = (offset) => api.get(`/notifications/user/${offset}`);

export const getAuthUsersUnseenCount = () => {
  return api.get('/notifications/user/unseen-count');
};

export const updateStatus = () => api.patch('/notifications/user/isRead');
