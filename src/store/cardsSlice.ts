import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CardResponse } from '../models/cards.model';

interface CardsState {
  cardsStore: Record<number, CardResponse>;
  cardsCounter: number;
}
const initialState: CardsState = {
  cardsStore: {},
  cardsCounter: 0,
};
const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardResponse>) => {
      state.cardsStore[action.payload.id] = action.payload;
      state.cardsCounter += 1;
    },
    removeCard: (state, action: PayloadAction<CardResponse>) => {
      delete state.cardsStore[action.payload.id];
      state.cardsCounter -= 1;
    },
    clear: (state) => {
      state.cardsStore = {};
      state.cardsCounter = 0;
    },
  },
});

export const { addCard, removeCard, clear } = cardsSlice.actions;
export default cardsSlice.reducer;
