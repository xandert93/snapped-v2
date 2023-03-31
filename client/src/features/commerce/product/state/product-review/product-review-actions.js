import { createAsyncThunk } from '@reduxjs/toolkit';
import { productReviewAPI } from '../../api';

export const createProductReview = createAsyncThunk(
  'commerce/product/reviews/createProductReview',
  productReviewAPI.create
);

export const fetchProductReviews = createAsyncThunk(
  'commerce/product/reviews/fetchProductReviews',
  productReviewAPI.getAll
);

export const updateProductReview = createAsyncThunk(
  'commerce/product/reviews/updateProductReview',
  productReviewAPI.update
);

export const deleteProductReview = createAsyncThunk(
  'commerce/product/reviews/deleteProductReview',
  productReviewAPI.remove
);
