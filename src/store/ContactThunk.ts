import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../http/axiosApi';
import {Contact, ContactList} from '../types';

export const createContact = createAsyncThunk<void, Contact>(
  'contact/create',
  async (contact) => {
    await axiosApi.post('/contacts.json', contact);
  },
);

export const getContacts = createAsyncThunk<Contact[]>(
  'contact/getAll',
  async () => {
    const response = await axiosApi.get<ContactList | null>('/contacts.json');
    const contacts = response.data;

    let newContacts: Contact[] = [];

    if (contacts) {
      newContacts = Object.keys(contacts).map(key => {
        const contact = contacts[key];
        return {
          ...contact,
          id: key,
        };
      });
    }
    return newContacts;
  },
);