import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { countries } from '../utils/countries';

interface CountryState {
  CountryStore: string[];
}
const initialState: CountryState = {
  CountryStore: countries,
};
const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    addCountry: (state, action: PayloadAction<string>) => {
      state.CountryStore.push(action.payload);
    },
    removeCountry: (state, action: PayloadAction<string>) => {
      state.CountryStore = state.CountryStore.filter(
        (country) => country !== action.payload
      );
    },
    clearCountries: (state) => {
      state.CountryStore = [];
    },
  },
});

export const { addCountry, removeCountry, clearCountries } =
  countrySlice.actions;
export default countrySlice.reducer;
