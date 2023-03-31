import { api } from '../../../../api';

export const getAuthUsersOrders = () => api.get('/orders/user');

export const getOrder = (id) => api.get(`/orders/${id}`);
