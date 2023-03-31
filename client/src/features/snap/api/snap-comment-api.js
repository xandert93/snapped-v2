import { api } from '../../../api';

//REQUEST @ '/'
// export const getAll = () =>  api.get();

//@ '/snap/:snapId'
export const get = (snapId, offset) => api.get(`/snap-comments/snap/${snapId}/${offset}`);
export const create = ({ snapId, text }) => api.post(`/snap-comments/snap/${snapId}`, { text });

//REQUEST @ '/:id'
// export const get = (id) =>  api.get(`/${id}`);
export const update = (commentId, text) => api.patch(`/snap-comments/${commentId}`, { text });

export const remove = ({ commentId }) => api.delete(`/snap-comments/${commentId}`);
