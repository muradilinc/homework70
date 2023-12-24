import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../http/axiosApi';
import {Contact} from '../types';

export const createContact = createAsyncThunk<void, Contact>(
  'contact/create',
  async (contact) => {
    await axiosApi.post('/contacts.json', contact);
  },
);