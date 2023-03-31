import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchOneTimeProducts } from './products-actions';

const initialState = {
  isFetching: false,
  errMessage: '',
  pageCount: 0,
  data: [],
};

const productsSlice = createSlice({
  name: 'commerce/product/products',
  initialState,
  reducers: {
    clearProducts: (state, action) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneTimeProducts.pending, (state, action) => {
        state.isFetching = true;
        state.errMessage = '';
      })
      .addCase(fetchOneTimeProducts.fulfilled, (state, action) => {
        const { pageCount, products } = action.payload;

        state.data = products;
        state.pageCount = pageCount;
      })
      .addCase(fetchOneTimeProducts.rejected, (state, action) => {
        const { name, message } = action.error;

        state.errMessage = message;
      })
      .addMatcher(
        isAnyOf(fetchOneTimeProducts.fulfilled, fetchOneTimeProducts.rejected),
        (state, action) => {
          state.isFetching = false;
        }
      );
  },
});

export const { clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
