import { api } from '../../../../api';

//REQUEST @ '/'
export const getAll = () => api.get('/chats');
export const create = (recipients) => api.post('/chats', recipients);

//REQUEST @ '/:id'
export const get = (id) => api.get(`/chats/${id}`);
export const update = (id, update) => api.patch(`/chats/${id}`, update);
export const remove = (id) => api.delete(`/chats/${id}`);
