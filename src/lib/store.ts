import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';
import { cardsApi } from '../api/cardsApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cards: cardsReducer,
      [cardsApi.reducerPath]: cardsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardsApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
