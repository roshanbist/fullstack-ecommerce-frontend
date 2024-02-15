import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import productReducer from './slices/ProductSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
