import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cards: cardsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
