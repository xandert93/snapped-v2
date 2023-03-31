import { combineReducers } from '@reduxjs/toolkit';

import current from './product/state/current-product/current-product-slice';
import products from './product/state/products/products-slice';
import reviews from './product/state/product-review/product-review-slice';

import basket from './basket/state/basket-slice';
import order from './order/state/order-slice';

// saw this suggested on StackOverflow

export default combineReducers({
  product: combineReducers({
    current,
    products,
    reviews,
  }),
  basket,
  // payment,
  order,
});
