import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { Category, CategoryInitialState } from '../../types/Category';

const URL = 'https://api.escuelajs.co/api/v1/categories';

const initialState: CategoryInitialState = {
  categories: [],
  categLoading: false,
  categError: '',
};

// Thunk action creator to fetch all categories ansynchornously
export const fetchAllCategories = createAsyncThunk(
  'fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<Category[]> = await axios.get(URL);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},

  extraReducers(builder) {
    // store categories if action is fulfilled
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: '',
      };
    });

    // handles loading state when action is pending
    builder.addCase(fetchAllCategories.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    // handles error state when action is rejected
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
