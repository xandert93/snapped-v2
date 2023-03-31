import { api } from '../../../../api';

//REQUEST @ '/'
export const getAll = () => api.get('/chat-messages');
export const create = (messageData) => api.post('/chat-messages', messageData);

//REQUEST @ '/:id'
export const get = (id) => api.get(`/chat-messages/${id}`);
export const update = (id, update) => api.patch(`/${id}`, update);
export const remove = (id) => api.delete(`/chat-messages/${id}`);
