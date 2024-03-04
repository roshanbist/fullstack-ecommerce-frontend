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
      const itemExist = state.items.some(
        (item) => item.id === action.payload.id
      );

      state.totalAmount +=
        action.payload.price * (action.payload.amount as number);

      if (itemExist) {
        state.items = state.items.map((item) => {
          if (item.id === action.payload.id) {
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
      const itemExist = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemExist) {
        state.totalAmount -= itemExist.price;

        if (itemExist?.amount === 1) {
          state.items = state.items.filter((item) => item.id !== itemExist.id);

          localStorage.setItem('cartCollection', JSON.stringify(state));
          toast.success('Item Removed Successfully');
        } else {
          const updatedItems = {
            ...itemExist,
            amount: (itemExist?.amount as number) - 1,
          };
          state.items = state.items.map((item) =>
            item.id === itemExist?.id ? updatedItems : item
          );
          localStorage.setItem('cartCollection', JSON.stringify(state));
          toast.success('Item Removed Successfully');
        }
      }
    },

    deleteItem: (state, action: PayloadAction<CartType>) => {
      const itemToDelete = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemToDelete) {
        state.totalAmount -=
          itemToDelete.price * (itemToDelete.amount as number);
        state.items = state.items.filter((item) => item.id !== itemToDelete.id);
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
