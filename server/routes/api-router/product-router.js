import express from 'express';
import {
  getProducts,
  getOneTimeProducts,
  getSubscriptionProducts,
  createOneTimeCheckout,
  createSubscriptionCheckout,
  createBillingSession,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/product-controller';

import {
  ensureIsAdmin,
  ensureIsNotSubscriber,
  ensureIsSubscriber,
  ensureIsVerified,
} from '../../middleware/auth-middleware';
import { ensureIsObjectId, loadPagination } from '../../middleware/mongoose-middleware';

const productRouter = express.Router();

productRouter.get('/', ensureIsAdmin, getProducts);

productRouter.get('/one-time', loadPagination('product'), getOneTimeProducts);
productRouter.get('/recurring', getSubscriptionProducts);

productRouter.post('/one-time/purchase', ensureIsVerified, createOneTimeCheckout);
productRouter.post(
  '/recurring/purchase',
  ensureIsVerified,
  ensureIsNotSubscriber,
  createSubscriptionCheckout
);
productRouter.get('/recurring/manage', ensureIsVerified, ensureIsSubscriber, createBillingSession);

productRouter.use('/:id', ensureIsObjectId('product'));
productRouter
  .route('/:id')
  .get(getProduct)
  .patch(ensureIsAdmin, updateProduct)
  .delete(ensureIsAdmin, deleteProduct);

export default productRouter;
