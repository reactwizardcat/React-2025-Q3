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
    toggleCard: (state, action: PayloadAction<CardResponse>) => {
      const cardId = action.payload.id;
      const card = state.cardsStore[cardId];

      if (!card) {
        state.cardsStore[cardId] = action.payload;
        state.cardsCounter += 1;
      } else {
        delete state.cardsStore[cardId];
        state.cardsCounter -= 1;
      }
    },
    clear: (state) => {
      state.cardsStore = {};
      state.cardsCounter = 0;
    },
  },
});

export const { toggleCard, clear } = cardsSlice.actions;
export default cardsSlice.reducer;
