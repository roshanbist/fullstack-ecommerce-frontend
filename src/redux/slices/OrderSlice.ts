import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { BASE_URL } from '../../utils/api';
import { OrderInitialState, OrderList } from '../../types/orderList';

const URL = `${BASE_URL}/orders`;

const initialState: OrderInitialState = {
  orders: [],
  selectedSingleOrder: null,
  loading: false,
  error: '',
};

// Thunk action creator to get all orders
export const getAllOrders = createAsyncThunk(
  'getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { accessToken } = JSON.parse(
        localStorage.getItem('userToken') as string
      );

      const response = await fetch(URL, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse.message);
      }

      const data: OrderList[] = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action creator to get a single order by its ID
export const getSingleOrder = createAsyncThunk(
  'getSingleOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const { accessToken } = JSON.parse(
        localStorage.getItem('userToken') as string
      );

      const response = await fetch(`${URL}/${orderId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse.message);
      }

      const data: OrderList = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// Thunk action creator to delete a order
export const deleteOrderById = createAsyncThunk(
  'deleteOrderById',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const { accessToken } = JSON.parse(
        localStorage.getItem('userToken') as string
      );

      const response = await fetch(`${URL}/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse.message);
      }

      toast.success('Order Deleted Successfully');
      return orderId;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},

  extraReducers(builder) {
    // Save orders data when getAllOrders action is fulfilled
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: '',
      };
    });

    // Handles loading state when getAllOrders action is pending
    builder.addCase(getAllOrders.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    // Handles error state when getAllOrders action is rejected
    builder.addCase(getAllOrders.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    });

    // fetch single product data when selectedSingleOrder action is fulfilled
    builder.addCase(getSingleOrder.fulfilled, (state, action) => {
      return {
        ...state,
        selectedSingleOrder: action.payload,
        loading: false,
        error: '',
      };
    });

    // handle loading state of selectedSingleOrder
    builder.addCase(getSingleOrder.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    // handle rejected state of selectedSingleOrder
    builder.addCase(getSingleOrder.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    });

    // delete order if fulfilled
    builder.addCase(deleteOrderById.fulfilled, (state, action) => {
      const orderId = action.payload;
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== orderId),
        loading: false,
        error: '',
      };
    });

    // handle pending state
    builder.addCase(deleteOrderById.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    });

    // handle rejected state
    builder.addCase(deleteOrderById.rejected, (state, action) => {
      return {
        ...state,
        error: action.error.message,
        loading: false,
      };
    });
  },
});

const orderReducer = orderSlice.reducer;
export default orderReducer;
