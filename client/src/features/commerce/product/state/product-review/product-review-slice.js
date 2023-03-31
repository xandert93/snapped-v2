import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { entityIdSelector, compareEntityUpdatedAtDesc } from '../../../../../utils/redux-utils';

import { clearProductPage } from '../current-product/current-product-slice';
import {
  createProductReview,
  deleteProductReview,
  fetchProductReviews,
} from './product-review-actions';

export const productReviewAdapter = createEntityAdapter({
  selectId: entityIdSelector,
  sortComparer: compareEntityUpdatedAtDesc,
});

const initialState = productReviewAdapter.getInitialState({
  isFetching: false,
  pageCount: 0,
  isPosting: false,
});

const productReviewSlice = createSlice({
  name: 'commerce/product/review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        const { pageCount, reviews } = action.payload;

        productReviewAdapter.setAll(state, reviews);
        state.pageCount = pageCount;
      })

      .addCase(createProductReview.pending, (state, action) => {
        state.isPosting = true;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        const { review } = action.payload;

        productReviewAdapter.upsertOne(state, review);
        state.current = initialState.current;
      })

      .addCase(deleteProductReview.fulfilled, (state, action) => {
        const reviewId = action.meta.arg.id;

        productReviewAdapter.removeOne(state, reviewId);
      })

      .addCase(clearProductPage, (state, action) => initialState)

      .addMatcher(
        isAnyOf(fetchProductReviews.pending, deleteProductReview.pending),
        (state, action) => {
          state.isFetching = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchProductReviews.fulfilled,
          fetchProductReviews.rejected,
          deleteProductReview.fulfilled,
          deleteProductReview.rejected
        ),
        (state, action) => {
          state.isFetching = false;
        }
      )
      .addMatcher(
        isAnyOf(createProductReview.fulfilled, createProductReview.rejected),
        (state, action) => {
          state.isPosting = false;
        }
      );
  },
});

export const { setReviewRating, setReviewText } = productReviewSlice.actions;

export default productReviewSlice.reducer;
