import { createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../api';

export const fetchProduct = createAsyncThunk(
  'commerce/product/current/fetchProduct',
  productAPI.get
);
