import { createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../api';

export const fetchOneTimeProducts = createAsyncThunk(
  'commerce/product/current/fetchOneTimeProducts',
  productAPI.getOneTimeProducts
);
