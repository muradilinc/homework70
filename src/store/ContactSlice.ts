import {Contact, ContactApi} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createContact, deleteContact, getContacts, getOneContact, updateContact} from './ContactThunk';
import {RootState} from '../redux/store';

interface ContactState {
  contacts: ContactApi[];
  selectContact: string;
  singleContact: Contact | null;
  createLoading: boolean;
  fetchContactsLoading: boolean;
  fetchSingleLoading: boolean;
  updateContactLoading: boolean;
  deleteContactLoading: boolean;
}

const initialState: ContactState = {
  contacts: [],
  selectContact: '',
  singleContact: null,
  createLoading: false,
  fetchContactsLoading: false,
  fetchSingleLoading: false,
  updateContactLoading: false,
  deleteContactLoading: false,
};

export const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    selectContact: (state, {payload: id}) => {
      state.selectContact = id;
    },
  },
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
    builder.addCase(getContacts.fulfilled, (state, {payload: contacts}: PayloadAction<ContactApi[]>) => {
      state.fetchContactsLoading = false;
      state.contacts = contacts;
    });
    builder.addCase(getContacts.rejected, (state) => {
      state.fetchContactsLoading = false;
    });
    builder.addCase(getOneContact.pending, (state) => {
      state.fetchSingleLoading = true;
    });
    builder.addCase(getOneContact.fulfilled, (state, {payload: contact}: PayloadAction<Contact>) => {
      state.fetchSingleLoading = false;
      state.singleContact = contact;
    });
    builder.addCase(getOneContact.rejected, (state) => {
      state.fetchSingleLoading = false;
    });
    builder.addCase(updateContact.pending, (state) => {
      state.updateContactLoading = true;
    });
    builder.addCase(updateContact.fulfilled, (state) => {
      state.updateContactLoading = false;
    });
    builder.addCase(updateContact.rejected, (state) => {
      state.updateContactLoading = false;
    });
    builder.addCase(deleteContact.pending, (state) => {
      state.deleteContactLoading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.deleteContactLoading = false;
    });
    builder.addCase(deleteContact.rejected, (state) => {
      state.deleteContactLoading = false;
    });

  },
});

export const contactReducer = ContactSlice.reducer;
export const {selectContact} = ContactSlice.actions;
export const selectorCreateLoading = (state: RootState) => state.contact.createLoading;
export const selectorContacts = (state: RootState) => state.contact.contacts;
export const selectorFetchContactsLoading = (state: RootState) => state.contact.fetchContactsLoading;
export const selectorSelectById = (state: RootState) => state.contact.selectContact;
export const selectorFetchSingleLoading = (state: RootState) => state.contact.fetchSingleLoading;
export const selectorSingleContact = (state: RootState) => state.contact.singleContact;
export const selectorUpdateContactLoading = (state: RootState) => state.contact.updateContactLoading;
export const selectorDeleteContactLoading = (state: RootState) => state.contact.deleteContactLoading;