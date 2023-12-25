import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../http/axiosApi';
import {Contact, ContactApi, ContactList} from '../types';

export const createContact = createAsyncThunk<void, Contact>(
  'contact/create',
  async (contact) => {
    await axiosApi.post('/contacts.json', contact);
  },
);

export const getContacts = createAsyncThunk<ContactApi[]>(
  'contact/getAll',
  async () => {
    const response = await axiosApi.get<ContactList | null>('/contacts.json');
    const contacts = response.data;

    let newContacts: ContactApi[] = [];

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

export const getOneContact = createAsyncThunk<Contact, string>(
  'contact/getOneContact',
  async (id) => {
    const response = await axiosApi.get<Contact | null>(`/contacts/${id}.json`);
    const contact = response.data;
    if (!contact) {
      throw new Error('Not found!');
    }
    return contact;
  },
);

export const updateContact = createAsyncThunk<void, {id: string, contact: Contact}>(
  'contact/update',
  async ({id, contact}) => {
    await axiosApi.put(`/contacts/${id}.json`, contact);
  },
);

export const deleteContact = createAsyncThunk<void, string>(
  'contact/delete',
  async (id) => {
    await axiosApi.delete(`/contacts/${id}.json`);
  },
);