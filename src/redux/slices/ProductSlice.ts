import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  FilterProduct,
  NewProductType,
  ProductInitialState,
  ProductType,
  ProductsList,
} from '../../types/Product';
import { BASE_URL } from '../../utils/api';

const URL = `${BASE_URL}/products`;

const initialState: ProductInitialState = {
  products: [],
  total: 0,
  selectedSingleProduct: null,
  loading: false,
  error: '',
};

// Thunk action creator to fetch all products asynchronously
export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async (filterParams: Partial<FilterProduct> = {}, { rejectWithValue }) => {
    let newUrl: string = URL;
    let querySeparator: string = '?';

    const { title, price, categoryId, sortTitle, offset, limit } = filterParams;

    if (title) {
      newUrl += `${querySeparator}title=${title}`;
      querySeparator = '&';
    }

    if (price) {
      if (price === 1) {
        newUrl += `${querySeparator}min_price=${price}&max_price=${price + 49}`;
        querySeparator = '&';
      } else if (price < 200) {
        newUrl += `${querySeparator}min_price=${price}&max_price=${price + 50}`;
        querySeparator = '&';
      } else if (price === 200) {
        newUrl += `${querySeparator}min_price=${price}&max_price=${Infinity}`;
        querySeparator = '&';
      }
    }

    if (categoryId) {
      newUrl += `${querySeparator}category=${categoryId}`;
      querySeparator = '&';
    }

    if (sortTitle) {
      newUrl += `${querySeparator}sort_title=${sortTitle}`;
      querySeparator = '&';
    }

    if (offset && limit) {
      newUrl += `${querySeparator}offset=${
        (offset - 1) * limit
      }&limit=${limit}`;
    }

    try {
      const response = await fetch(newUrl);

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse.message);
      }

      const data: ProductsList = await response.json();

      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action creator to fetch a single product by its ID
export const fetchSingleProduct = createAsyncThunk(
  'fetchSingleProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/${productId}`);

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse.message);
      }

      const data: ProductType = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action creator to update product by its id
export const updateSingleProduct = createAsyncThunk(
  'updateSingleProduct',
  async (updatedParams: ProductType, { rejectWithValue }) => {
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

      const data: ProductType = await response.json();
      toast.success(`Product Updated Successfully`);
      return data;
    } catch (e) {
      const error = e as Error;
      toast.error(`Updated Failed. Please try again`);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action creator to create a new product
export const createNewProduct = createAsyncThunk(
  'createNewProduct',
  async (params: NewProductType, { rejectWithValue }) => {
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

      const data: ProductType = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action creator to delete a product
export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const { accessToken } = JSON.parse(
        localStorage.getItem('userToken') as string
      );

      const response = await fetch(`${URL}/${productId}`, {
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

      toast.success('Item Deleted Successfully');

      return productId;
    } catch (e) {
      const error = e as Error;
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
        products: action.payload.products,
        total: action.payload.total,
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
        loading: false,
        error: '',
      };
    });

    // handle pending state
    builder.addCase(createNewProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    // handle rejected state
    builder.addCase(createNewProduct.rejected, (state, action) => {
      return {
        ...state,
        error: action.error.message,
        loading: false,
      };
    });

    // add update single product if fulfilled
    builder.addCase(updateSingleProduct.fulfilled, (state, action) => {
      const updatedProductIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );

      const updatedProducts = [...state.products];
      updatedProducts[updatedProductIndex] = action.payload;

      return {
        ...state,
        products: updatedProducts,
        loading: false,
        error: '',
      };
    });

    // handle pending state
    builder.addCase(updateSingleProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    // handle rejected state
    builder.addCase(updateSingleProduct.rejected, (state, action) => {
      return {
        ...state,
        error: action.error.message,
        loading: false,
      };
    });

    // delete product to products array if fulfilled
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const productId = action.payload;
      return {
        ...state,
        products: state.products.filter((product) => product._id !== productId),
        loading: false,
        error: '',
      };
    });

    // handle pending state
    builder.addCase(deleteProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    // handle rejected state
    builder.addCase(deleteProduct.rejected, (state, action) => {
      return {
        ...state,
        error: action.error.message,
        loading: false,
      };
    });
  },
});

const productReducer = productSlice.reducer;
export default productReducer;
