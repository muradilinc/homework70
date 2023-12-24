import {Contact} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createContact} from './ContactThunk';
import {RootState} from '../redux/store';

interface ContactState {
  contacts: Contact[];
  createLoading: boolean;
}

const initialState: ContactState = {
  contacts: [],
  createLoading: false,
}

export const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createContact.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createContact.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createContact.rejected, (state) => {
      state.createLoading = false;
    });
  },
});

export const contactReducer = ContactSlice.reducer;
export const selectorCreateLoading = (state: RootState) => state.contact.createLoading;