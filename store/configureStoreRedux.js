import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersReducer';

export const configureStoreRedux = configureStore({
  reducer: {
    users: usersReducer
  }
});