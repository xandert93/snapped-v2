import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  createProductReview,
  deleteProductReview,
  fetchProductReviews,
} from '../product-review/product-review-actions';
import { fetchProduct } from './current-product-actions';

const initialState = {
  isFetching: true,
  errMessage: '',
  entity: null,
};

const currentProductSlice = createSlice({
  name: 'commerce/product/current',
  initialState,
  reducers: {
    clearProductPage: (state, action) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.isFetching = true;
        state.errMessage = '';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const { product } = action.payload;

        state.entity = product;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        const { name, message } = action.error;

        state.errMessage = message;
      })

      // when new review created, adjust current product rating
      .addCase(createProductReview.fulfilled, (state, action) => {
        const newRating = action.meta.arg.review.rating;

        const {
          rating: { count, average },
        } = state.entity;

        const totalRating = count * average;
        const newCount = count + 1;
        const newAverage = (totalRating + newRating) / newCount;

        state.entity.rating = { count: newCount, average: newAverage };
      })

      // when review deleted, adjust current product rating
      .addCase(deleteProductReview.fulfilled, (state, action) => {
        const deletedRating = action.meta.arg.rating;

        const {
          rating: { count, average },
        } = state.entity;

        const totalRating = count * average;
        const newCount = count - 1;

        const newAverage = newCount ? (totalRating - deletedRating) / newCount : 0; // if new review count drops to 0, the average will be 0. Otherwise it will do 0/0 ==> NaN, which is not what we want in state

        state.entity.rating = { count: newCount, average: newAverage };
      })

      .addMatcher(isAnyOf(fetchProduct.fulfilled, fetchProduct.rejected), (state, action) => {
        state.isFetching = false;
      });
  },
});

export const { clearProductPage } = currentProductSlice.actions;

export default currentProductSlice.reducer;
