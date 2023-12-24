import {Contact} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createContact, getContacts} from './ContactThunk';
import {RootState} from '../redux/store';

interface ContactState {
  contacts: Contact[];
  createLoading: boolean;
  fetchContactsLoading: boolean;
}

const initialState: ContactState = {
  contacts: [],
  createLoading: false,
  fetchContactsLoading: false,
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
    builder.addCase(getContacts.pending, (state) => {
      state.fetchContactsLoading = true;
    });
    builder.addCase(getContacts.fulfilled, (state, {payload: contacts}: PayloadAction<Contact[]>) => {
      state.fetchContactsLoading = false;
      state.contacts = contacts;
    });
    builder.addCase(getContacts.rejected, (state) => {
      state.fetchContactsLoading = false;
    });

  },
});

export const contactReducer = ContactSlice.reducer;
export const selectorCreateLoading = (state: RootState) => state.contact.createLoading;
export const selectorContacts = (state: RootState) => state.contact.contacts;
export const selectorFetchContactsLoading = (state: RootState) => state.contact.fetchContactsLoading;