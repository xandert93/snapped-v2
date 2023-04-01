import express from 'express';
import { getOrder, getOrders, getReqUsersOrders } from '../../controllers/order-controller.js';
import { loadOrder } from '../../middleware/order-middleware.js';
import { ensureIsReqUsers } from '../../middleware/auth-middleware.js';
import { ensureIsObjectId } from '../../middleware/mongoose-middleware.js';

const orderRouter = express.Router();

orderRouter.get('/user', getReqUsersOrders);

orderRouter.use('/:id', ensureIsObjectId('order'), loadOrder, ensureIsReqUsers('order', 'userId'));
orderRouter.get('/:id', getOrder);

/* 
orderRouter.use(ensureIsAdmin);
orderRouter.route('/').get(getOrders).post(createOrder)
orderRouter.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder); 
*/

export default orderRouter;
