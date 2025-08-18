import { configureStore } from '@reduxjs/toolkit';
import formsSlice from './formsSlice';

export const store = configureStore({
  reducer: {
    cards: formsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
