import { productReviewAdapter } from './product-review-slice';

const getReviewsState = (state) => state.commerce.product.reviews;

// ENTITY SELECTORS
export const { selectIds: selectProductReviewIds } =
  productReviewAdapter.getSelectors(getReviewsState);

const { selectById } = productReviewAdapter.getSelectors(getReviewsState);
export const selectProductReviewById = (id) => (state) => selectById(state, id);

// STANDARD SELECTORS
export const selectAreReviewsFetching = (state) => getReviewsState(state).isFetching;
export const selectIsReviewPosting = (state) => getReviewsState(state).isPosting;
export const selectReviewPageCount = (state) => getReviewsState(state).pageCount;
