import { api } from '../../../../api';

export const get = () => api.get('/baskets/user'); // gets auth user's basket

export const addLineItem = (productData) => api.post('/baskets/user/lineItems', productData); // { product, quantity }

export const adjustLineItem = (update) => api.patch('/baskets/user/lineItems', update); // { product, incValue }

export const removeLineItem = (priceId) => {
  return api.delete('/baskets/user/lineItems', { data: { priceId } });
};

export const clear = () => api.patch('/baskets/user/clear');

/*

If my application allowed an Admin to log in and perform full CRUD on baskets etc,
I would probably need to have a bespoke `userBasketAPI` and an `adminBasketAPI`.

For example, calling .get() on the user's API would return their aggregated basket,
whereas calling .get on the admin's API would return any user's raw basket, which the 
admin could then investigate.

*/
