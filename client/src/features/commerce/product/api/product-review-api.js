import { api } from '../../../../api';

//REQUEST @ '/product/:productId'
export const getAll = ({ productId, pageNum }) => {
  return api.get(`/product-reviews/product/${productId}?page=${pageNum}`);
};

export const create = ({ productId, review }) => {
  return api.post(`/product-reviews/product/${productId}`, review);
};

//REQUEST @ '/:id'
export const update = ({ id, update }) => api.patch(`/product-reviews/${id}`, update);
export const remove = ({ id }) => api.delete(`/product-reviews/${id}`);
