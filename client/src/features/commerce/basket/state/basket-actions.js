import { createAsyncThunk } from '@reduxjs/toolkit';
import { basketAPI } from '../api';
import { productAPI } from '../../product/api';

export const fetchBasket = createAsyncThunk(
  'commerce/basket/fetchBasket',
  basketAPI.get // 1
);

export const addLineItemToBasket = createAsyncThunk(
  'commerce/basket/addLineItemToBasket',
  basketAPI.addLineItem //2
);

export const removeLineItemFromBasket = createAsyncThunk(
  'commerce/basket/removeLineItemFromBasket',
  basketAPI.removeLineItem //2
);

export const adjustBasketLineItemQuantity = createAsyncThunk(
  'commerce/basket/adjustBasketLineItemQuantity',
  basketAPI.adjustLineItem //2
);

export const clearBasket = createAsyncThunk('commerce/basket/clearBasket', basketAPI.clear);

export const checkoutBasket = createAsyncThunk(
  'commerce/basket/checkoutBasket',
  async (args, { getState, dispatch }) => {
    const basketProductEntities = getState().commerce.basket.entities; //*** can't import `selectLineItems` without module error

    let lineItems = [];

    for (let key in basketProductEntities) {
      const { priceId, quantity } = basketProductEntities[key];
      const lineItem = { priceId, quantity };
      lineItems.push(lineItem);
    }

    const { checkoutURL } = await productAPI.createOneTimeCheckout(lineItems);
    window.location.href = checkoutURL;
  }
);

/* 

1) The database's basket doc has a `.lineItems` field containing [{ priceId, quantity }, ...].
   However, when the basket doc is fetched, aggregation will effectively swap out `.lineItems`
   for `.products`. The products stored in `.products` are in fact lighter `product` docs 
   that are suited for the `Basket` page. For example, my aggregation pipeline removes 
   `product.description` as this serves no purpose on the basket. Similarly, the basket will only 
   display 1 image, and thus, my aggregation pipeline only keeps `imageURLs[0]`. I like to think
   of each of these lightened products as a `basketProduct`. 

2) On the server, the `addLineItemToBasket`, `removeLineItemFromBasket`, `adjustLineItemQuantity`
   calls add/remove a `lineItem` to database basket doc. This is why I've named the async thunks 
   according to "lineItems". However, following a 2xx response, in the case reducers we will use the 
   original fetched product to create a `basketProduct` which will be added/removed to/from the 
   client-side basket.

*/
