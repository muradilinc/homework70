export interface Contact {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export interface ContactList {
  [id: string]: Contact;
}

export interface ContactApi extends Contact{
  id: string;
}