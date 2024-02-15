import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ProductInitialState, ProductType } from '../../misc/type';

const URL = 'https://api.escuelajs.co/api/v1/products';

const initialState: ProductInitialState = {
  products: [],
  loading: false,
  error: '',
};

// Thunk action creator to fetch all products asynchronously
export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async () => {
    try {
      const response: AxiosResponse<ProductType[]> = await axios.get(URL);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers(builder) {
    // Save products data in redux when the fetchAllProducts action is fulfilled
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });

    // Handles loading state when the fetchAllProducts action is pending
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    // Handles error state when the fetchAllProducts action is rejected
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
  },
});

const productReducer = productSlice.reducer;
export default productReducer;
