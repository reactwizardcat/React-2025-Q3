import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { FormData } from '../schema/formShema';

interface CardsState {
  cardsStore: Record<
    string,
    {
      data: FormData;
      status: 'fulfilled' | 'pending';
    }
  >;
}

export const submitFormWithDelay = createAsyncThunk(
  'cards/submitFormWithDelay',
  async (formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return formData;
  }
);

const initialState: CardsState = {
  cardsStore: {},
};

const formsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFormWithDelay.pending, (state, action) => {
        const formData = action.meta.arg;
        state.cardsStore[formData.id] = {
          data: formData,
          status: 'pending',
        };
      })
      .addCase(submitFormWithDelay.fulfilled, (state, action) => {
        const formId = action.payload.id;

        if (state.cardsStore[formId]) {
          state.cardsStore[formId].status = 'fulfilled';
          state.cardsStore[formId].data = action.payload;
        }
      });
  },
});

export default formsSlice.reducer;
