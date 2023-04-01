import { Order, Product, ProductReview } from '../models/index.js';
import { NotFoundError, ForbiddenError } from '../utils/error-types.js';

export const loadProduct = async (req, res, next) => {
  const { id } = req.params;

  const foundProduct = await Product.findById(id);
  if (!foundProduct) throw new NotFoundError('product');

  req.product = foundProduct;
  next();
};

export const loadProductReview = async (req, res, next) => {
  const { id } = req.params;

  const foundReview = await ProductReview.findById(id);
  if (!foundReview) throw new NotFoundError('review');

  req.review = foundReview;
  next();
};

export const ensureIsPurchased = async (req, res, next) => {
  const { userId, customerId, product } = req;

  const foundOrder = await Order.findOne({
    customerId,
    'lineItems.priceId': product.priceId,
  });

  if (!foundOrder) throw new ForbiddenError('You must first purchase this product');
  else next();
};
