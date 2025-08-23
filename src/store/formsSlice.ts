import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormShemaType } from '../schema/formShema';

interface CardsState {
  cardsStore: FormShemaType[];
}
const initialState: CardsState = {
  cardsStore: [],
};
const formsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormShemaType>) => {
      state.cardsStore.push(action.payload);
    },
  },
});

export const { addFormData } = formsSlice.actions;
export default formsSlice.reducer;
