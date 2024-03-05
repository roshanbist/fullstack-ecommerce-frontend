import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Category, CategoryInitialState } from '../../types/Category';
import { toast } from 'react-toastify';

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
      const response = await fetch(URL);

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse.message);
      }

      const data: Category[] = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
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
