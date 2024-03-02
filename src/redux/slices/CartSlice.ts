import { createSlice } from '@reduxjs/toolkit';
import { CartInitialState } from '../../types/Cart';
import { toast } from 'react-toastify';

const initialState: CartInitialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemExist = state.items.some(
        (item) => item.id === action.payload.id
      );

      // calculate totalAmount
      state.totalAmount += action.payload.price * action.payload.amount;

      if (itemExist) {
        // update the items array
        state.items = state.items.map((item) => {
          if (item.id === action.payload.id) {
            // return object by updating its amount
            return { ...item, amount: item.amount + action.payload.amount };
          } else {
            // return object
            return item;
          }
        });
      } else {
        state.items.push(action.payload);
      }

      toast.success('Item Added Successfully');

      //
    },
    deleteItem: (state, action) => {
      //
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addItem, deleteItem } = cartSlice.actions;

export default cartReducer;
