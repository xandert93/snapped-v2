import express from 'express';
import {
  createProductReview,
  deleteProductReview,
  getProductReviews,
  updateProductReview,
} from '../../controllers/product-review-controller.js';
import { ensureIsReqUsers } from '../../middleware/auth-middleware.js';

import { ensureIsObjectId, loadPagination } from '../../middleware/mongoose-middleware.js';
import {
  ensureIsPurchased,
  loadProduct,
  loadProductReview,
} from '../../middleware/product-middleware.js';

const reviewRouter = express.Router();

reviewRouter.use('/product/:id', ensureIsObjectId('product'));
reviewRouter
  .route('/product/:id')
  .post(loadProduct, ensureIsPurchased, createProductReview)
  .get(loadPagination('review'), getProductReviews);

reviewRouter.use(
  '/:id',
  ensureIsObjectId('review'),
  loadProductReview,
  ensureIsReqUsers('review', 'reviewerId')
);
reviewRouter.route('/:id').patch(updateProductReview).delete(deleteProductReview);

export default reviewRouter;
