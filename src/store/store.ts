import { configureStore } from '@reduxjs/toolkit';
import formsSlice from './formsSlice';
import countrySlice from './countriesSlice';

export const store = configureStore({
  reducer: {
    cards: formsSlice,
    countries: countrySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
