import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { ProductInitialState, ProductType } from '../../types/Product';

const URL = 'https://api.escuelajs.co/api/v1/products';

const initialState: ProductInitialState = {
  products: [],
  selectedSingleProduct: null,
  loading: false,
  error: '',
};

// Thunk action creator to fetch all products asynchronously
export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ProductType[]> = await axios.get(URL);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// Thunk action creator to fetch a single product by its ID
export const fetchSingleProduct = createAsyncThunk(
  'fetchSingleProduct',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ProductType> = await axios.get(
        `${URL}/${productId}`
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers(builder) {
    // Save products data when fetchAllProducts action is fulfilled
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: '',
      };
    });

    // Handles loading state when fetchAllProducts action is pending
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    // Handles error state when fetchAllProducts action is rejected
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    });

    // save single product data when fetchSingleProduct action is fulfilled
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      return {
        ...state,
        selectedSingleProduct: action.payload,
        loading: false,
        error: '',
      };
    });

    builder.addCase(fetchSingleProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    });
  },
});

const productReducer = productSlice.reducer;
export default productReducer;
