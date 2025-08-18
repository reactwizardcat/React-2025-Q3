import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormsData } from '../model/formsData.model';

interface CardsState {
  cardsStore: FormsData[];
}
const initialState: CardsState = {
  cardsStore: [],
};
const formsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormsData>) => {
      state.cardsStore.push(action.payload);
    },
  },
});

export const { addFormData } = formsSlice.actions;
export default formsSlice.reducer;
