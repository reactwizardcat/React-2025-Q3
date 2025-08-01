import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CardResponse } from '../models/cards.model';

interface CardsState {
  cardsArray: Array<CardResponse>;
  cardsCounter: number;
}
const initialState: CardsState = {
  cardsArray: [],
  cardsCounter: 0,
};
const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleCard: (state, action: PayloadAction<CardResponse>) => {
      const cardId = action.payload.id;
      const card = state.cardsArray.find((card) => card.id === cardId);

      if (!card) {
        state.cardsArray.push(action.payload);
        state.cardsCounter += 1;
      } else {
        state.cardsArray = state.cardsArray.filter(
          (card) => card.id !== cardId
        );
        state.cardsCounter -= 1;
      }
    },
    clear: (state) => {
      state.cardsArray = [];
      state.cardsCounter = 0;
    },
  },
});

export const { toggleCard, clear } = cardsSlice.actions;
export default cardsSlice.reducer;
