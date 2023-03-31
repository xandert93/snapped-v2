import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  clearBasket,
  fetchBasket,
  addLineItemToBasket,
  removeLineItemFromBasket,
  adjustBasketLineItemQuantity,
} from './basket-actions';

export const basketAdapter = createEntityAdapter({
  selectId: (lineItem) => lineItem.priceId,
});

const initialState = basketAdapter.getInitialState({
  isFetching: false,
});

const basketSlice = createSlice({
  name: 'commerce/basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasket.fulfilled, (state, action) => {
        const { basket } = action.payload;

        basketAdapter.upsertMany(state, basket.products);
      })

      // upsert (create if absent or update if present) product. If already present, add passed quantity to current quantity
      .addCase(addLineItemToBasket.fulfilled, (state, action) => {
        const { basketProduct } = action.payload; // stripped `product` suitable for <Basket> display

        basketAdapter.upsertOne(state, basketProduct);
      })
      .addCase(removeLineItemFromBasket.fulfilled, (state, action) => {
        const priceId = action.meta.arg;

        basketAdapter.removeOne(state, priceId);
      })

      // increment or decrement product quantity based on `incValue` of `1` or `-1`
      .addCase(adjustBasketLineItemQuantity.fulfilled, (state, action) => {
        const { priceId, incValue } = action.meta.arg;

        state.entities[priceId].quantity += incValue;
      })
      .addCase(clearBasket.fulfilled, basketAdapter.removeAll)

      .addMatcher(
        isAnyOf(
          fetchBasket.pending,
          clearBasket.pending,
          addLineItemToBasket.pending,
          removeLineItemFromBasket.pending,
          adjustBasketLineItemQuantity.pending
        ),
        (state, action) => {
          state.isFetching = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBasket.fulfilled,
          clearBasket.fulfilled,
          addLineItemToBasket.fulfilled,
          removeLineItemFromBasket.fulfilled,
          adjustBasketLineItemQuantity.fulfilled,
          fetchBasket.rejected,
          clearBasket.rejected,
          addLineItemToBasket.rejected,
          removeLineItemFromBasket.rejected,
          adjustBasketLineItemQuantity.rejected
        ),
        (state, action) => {
          state.isFetching = false;
        }
      );
  },
});

export const {} = basketSlice.actions;

export default basketSlice.reducer;
