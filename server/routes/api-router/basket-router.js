import express from 'express';
import { ensureHasStock, loadUsersBasket } from '../../middleware/basket-middleware.js';
import {
  addLineItemToUsersBasket,
  adjustBasketLineItemQuantity,
  clearUsersBasket,
  getUsersBasket,
  removeLineItemFromUsersBasket,
} from '../../controllers/basket-controller.js';

const basketRouter = express.Router();

basketRouter.get('/user', getUsersBasket);

basketRouter.use(loadUsersBasket);
basketRouter
  .route('/user/lineItems')
  .post(addLineItemToUsersBasket) // 1
  .patch(adjustBasketLineItemQuantity)
  .delete(removeLineItemFromUsersBasket);

basketRouter.patch('/user/clear', clearUsersBasket);

export default basketRouter;

/*
  1) `ensureStock` is probably quite tricky to implement e.g. what if someone buys 
      stock and UI has stale stock data etc. Maybe best leave other implementations for now.


*/
