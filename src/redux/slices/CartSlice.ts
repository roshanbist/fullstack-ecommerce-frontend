import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartInitialState, CartType } from '../../types/Cart';
import { toast } from 'react-toastify';

const loadCartItems = (): CartInitialState => {
  const cartState = localStorage.getItem('cartCollection');
  return cartState ? JSON.parse(cartState) : { items: [], totalAmount: 0 };
};

const initialState: CartInitialState = loadCartItems() || {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartType>) => {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );

      state.totalAmount +=
        action.payload.price * (action.payload.amount as number);

      if (existingItemIndex !== -1) {
        state.items = state.items.map((item) => {
          if (
            item._id === action.payload._id &&
            item.size === action.payload.size
          ) {
            return {
              ...item,
              amount:
                (item.amount as number) + (action.payload.amount as number),
            };
          } else {
            return item;
          }
        });
      } else {
        state.items.push(action.payload);
      }

      // Save cart to localStorage
      localStorage.setItem('cartCollection', JSON.stringify(state));
      toast.success('Item Added Successfully');
    },

    removeItem: (state, action: PayloadAction<CartType>) => {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];

        state.totalAmount -= existingItem.price;

        if (existingItem?.amount === 1) {
          state.items.splice(existingItemIndex, 1);
        } else {
          const updatedItems = {
            ...existingItem,
            amount: (existingItem?.amount as number) - 1,
          };
          state.items = state.items.map((item) =>
            item._id === existingItem?._id && item.size === existingItem?.size
              ? updatedItems
              : item
          );
        }

        localStorage.setItem('cartCollection', JSON.stringify(state));
        toast.success('Item Removed Successfully');
      }
    },

    deleteItem: (state, action: PayloadAction<CartType>) => {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];

        state.totalAmount -=
          existingItem.price * (existingItem.amount as number);

        state.items.splice(existingItemIndex, 1);

        localStorage.setItem('cartCollection', JSON.stringify(state));
        toast.success('Item Removed successfully');
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;

export default cartReducer;
