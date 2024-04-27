import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  Category,
  CategoryBase,
  CategoryInitialState,
} from '../../types/Category';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/api';

const URL = `${BASE_URL}/categories`;

const initialState: CategoryInitialState = {
  categories: [],
  selectedSingleCategory: null,
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

// Thunk action creator to fetch a single category by its ID
export const fetchSingleCategory = createAsyncThunk(
  'fetchSingleCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/${categoryId}`);

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse.message);
      }

      const data: Category = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action creator to create a new category
export const createNewCategory = createAsyncThunk(
  'createNewCategory',
  async (params: CategoryBase, { rejectWithValue }) => {
    try {
      const { accessToken } = JSON.parse(
        localStorage.getItem('userToken') as string
      );

      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse.message);
      }

      const data: Category = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action creator to update category by its id
export const updateSingleCategory = createAsyncThunk(
  'updateSingleCategory',
  async (updatedParams: Category, { rejectWithValue }) => {
    try {
      const { _id } = updatedParams;
      const { accessToken } = JSON.parse(
        localStorage.getItem('userToken') as string
      );
      const response = await fetch(`${URL}/${_id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedParams),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(`Updated Failed. Please try again`);
        return rejectWithValue(errorResponse.message);
      }

      const data: Category = await response.json();
      toast.success(`Category Updated Successfully`);
      return data;
    } catch (e) {
      const error = e as Error;
      toast.error(`Updated Failed. Please try again`);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action creator to delete a category
export const deleteCategory = createAsyncThunk(
  'deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const { accessToken } = JSON.parse(
        localStorage.getItem('userToken') as string
      );

      const response = await fetch(`${URL}/${categoryId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse.message);
      }

      toast.success('Category Deleted Successfully');
      return categoryId;
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
        categLoading: false,
        categError: '',
      };
    });

    // handles loading state when action is pending
    builder.addCase(fetchAllCategories.pending, (state, action) => {
      return {
        ...state,
        categLoading: true,
        categError: '',
      };
    });

    // handles error state when action is rejected
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      return {
        ...state,
        categLoading: false,
        categError: action.error.message,
      };
    });

    // fetch single category data when fetchSingleCategory action is fulfilled
    builder.addCase(fetchSingleCategory.fulfilled, (state, action) => {
      return {
        ...state,
        selectedSingleCategory: action.payload,
        categLoading: false,
        categError: '',
      };
    });

    // handle loading state of fetchingSingleCategory
    builder.addCase(fetchSingleCategory.pending, (state, action) => {
      return {
        ...state,
        categLoading: true,
        categError: '',
      };
    });

    // handle rejected state of fetchingSingleCategory
    builder.addCase(fetchSingleCategory.rejected, (state, action) => {
      return {
        ...state,
        categLoading: false,
        categError: action.error.message,
      };
    });

    // create new category if action is fulfilled
    builder.addCase(createNewCategory.fulfilled, (state, action) => {
      return {
        ...state,
        categories: [...state.categories, action.payload],
        categLoading: false,
        categError: '',
      };
    });

    // handles loading state when action is pending
    builder.addCase(createNewCategory.pending, (state, action) => {
      return {
        ...state,
        categLoading: true,
        categError: '',
      };
    });

    // handles error state when action is rejected
    builder.addCase(createNewCategory.rejected, (state, action) => {
      return {
        ...state,
        categLoading: false,
        categError: action.error.message,
      };
    });

    // add new category to categorys array if fulfilled
    builder.addCase(updateSingleCategory.fulfilled, (state, action) => {
      const updatedCategoryIndex = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );

      const updatedCategories = [...state.categories];
      updatedCategories[updatedCategoryIndex] = action.payload;

      return {
        ...state,
        categories: updatedCategories,
        categLoading: false,
        categError: '',
      };
    });

    // handle pending state
    builder.addCase(updateSingleCategory.pending, (state, action) => {
      return {
        ...state,
        categLoading: true,
        categError: '',
      };
    });

    // handle rejected state
    builder.addCase(updateSingleCategory.rejected, (state, action) => {
      return {
        ...state,
        categError: action.error.message,
        categLoading: false,
      };
    });

    // delete category if fulfilled
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const categoryId = action.payload;
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== categoryId
        ),
        categLoading: false,
        categError: '',
      };
    });

    // handle pending state
    builder.addCase(deleteCategory.pending, (state, action) => {
      return {
        ...state,
        categLoading: true,
        categError: '',
      };
    });

    // handle rejected state
    builder.addCase(deleteCategory.rejected, (state, action) => {
      return {
        ...state,
        categError: action.error.message,
        categLoading: false,
      };
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
