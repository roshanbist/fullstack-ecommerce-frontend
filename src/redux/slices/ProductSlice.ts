import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import {
  NewProductType,
  ProductInitialState,
  ProductType,
} from '../../types/Product';

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
      const error = e as AxiosError;
      return rejectWithValue(error.message);
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

// Thunk action creator to create a new product
export const createNewProduct = createAsyncThunk(
  'createNewProduct',
  async (params: NewProductType, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ProductType> = await axios.post(
        URL,
        params
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action creator to delete a product
export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ProductType[]> = await axios.delete(
        `${URL}/${productId}`
      );
      console.log('delete');
      return { data: response.data, productId };
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
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

    // fetch single product data when fetchSingleProduct action is fulfilled
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      return {
        ...state,
        selectedSingleProduct: action.payload,
        loading: false,
        error: '',
      };
    });

    // handle loading state of fetchingSingleProduct
    builder.addCase(fetchSingleProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    // handle rejected state of fetchingSingleProduct
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    });

    // add new product to products array if fulfilled
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    });

    // handle pending state
    builder.addCase(createNewProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    // handle rejected state
    builder.addCase(createNewProduct.rejected, (state, action) => {
      return {
        ...state,
        error: action.error.message,
      };
    });

    // delete product to products array if fulfilled
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      console.log('delete', action.payload);
      const { productId } = action.payload;
      return {
        ...state,
        products: state.products.filter((product) => product.id !== productId),
      };
    });

    // handle pending state
    builder.addCase(deleteProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    // handle rejected state
    builder.addCase(deleteProduct.rejected, (state, action) => {
      return {
        ...state,
        error: action.error.message,
      };
    });
  },
});

const productReducer = productSlice.reducer;
export default productReducer;
