import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import productReducer from './slices/ProductSlice';
import categoryReducer from './slices/CategorySlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
