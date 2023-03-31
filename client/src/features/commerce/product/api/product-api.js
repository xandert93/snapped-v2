import { api } from '../../../../api';

//REQUEST @ '/'
export const getOneTimeProducts = (params) => api.get('/products/one-time', { params });
export const getSubscriptionProducts = () => api.get('/products/recurring');

export const createOneTimeCheckout = (items) => api.post('/products/one-time/purchase', items);
export const createSubscriptionCheckout = (priceId) => {
  return api.post('/products/recurring/purchase', { priceId });
};

export const manageSubscription = () => api.get('/products/recurring/manage');

//REQUEST @ '/:id'
export const get = (id) => api.get(`/products/${id}`);
export const update = (id) => api.patch(`/products/${id}`);
export const remove = (id) => api.delete(`/products/${id}`);
