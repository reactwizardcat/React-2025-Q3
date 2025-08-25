import { createSlice } from '@reduxjs/toolkit';
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
  reducers: {},
});

export default countrySlice.reducer;
