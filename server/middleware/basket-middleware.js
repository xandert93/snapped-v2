import { Basket, Product } from '../models';
import { ForbiddenError } from '../utils/error-types';

export const loadUsersBasket = async (req, res, next) => {
  const { userId } = req;

  const foundBasket = await Basket.findOne({ userId });

  req.basket = foundBasket;
  next();
};

export const ensureHasStock = async (req, res, next) => {
  const { product, quantity } = req.body;

  const foundProduct = await Product.findById(product._id);

  if (quantity > foundProduct.stockCount) throw new ForbiddenError('Insufficient stock');
  else next();
};
