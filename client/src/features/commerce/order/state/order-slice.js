import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'commerce/order',
  initialState: '',
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase().addCase().addMatcher()
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
