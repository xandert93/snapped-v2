import { Order } from '../models/index.js';
import { NotFoundError } from '../utils/error-types.js';

export const loadOrder = async (req, res, next) => {
  const { id } = req.params;

  const foundOrder = await Order.findById(id);
  if (!foundOrder) throw new NotFoundError('order');

  req.order = foundOrder;
  next();
};
