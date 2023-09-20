import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './FilterSlice';
import cartReducer from './cartReducer';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterSlice,
    user: userSlice,
  },
});


export default store;
