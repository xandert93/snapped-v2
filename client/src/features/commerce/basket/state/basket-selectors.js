import { createSelector } from 'reselect';
import { basketAdapter } from './basket-slice';

// ENTITY SELECTORS
export const {
  selectIds: selectBasketProductIds,
  selectEntities: selectBasketProductEntities,
  selectAll: selectAllBasketProducts, // when we send off to server, needs to be in array form. So, just use this
} = basketAdapter.getSelectors((state) => state.commerce.basket);

const { selectById } = basketAdapter.getSelectors((state) => state.commerce.basket);
export const selectBasketProductById = (id) => (state) => selectById(state, id);

// STANDARD SELECTORS
export const selectIsBasketFetching = (state) => state.commerce.basket.isFetching;

// DERIVED SELECTORS
export const selectBasketItemCount = createSelector(selectBasketProductEntities, (entities) => {
  let count = 0;

  for (let key in entities) {
    const { quantity } = entities[key];
    count += quantity;
  }

  return count;
});

export const selectBasketTotal = createSelector(selectBasketProductEntities, (entities) => {
  let total = 0;

  for (let key in entities) {
    const { price, quantity } = entities[key];
    const productTotal = price * quantity;
    total += productTotal;
  }

  return total;
});

export const selectLineItems = createSelector(selectBasketProductEntities, (entities) => {
  let lineItems = [];

  for (let key in entities) {
    const { priceId, quantity } = entities[key];
    const lineItem = { priceId, quantity };
    lineItems.push(lineItem);
  }

  return lineItems;
});
