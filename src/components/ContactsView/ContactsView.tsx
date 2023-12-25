import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectContact, selectorContacts} from '../../store/ContactSlice';
import {ContactApi} from '../../types';
import ContactViewMemoed from './ContactView';

interface Props {
  onOpen: () => void;
}

const ContactsView: React.FC<Props> = ({onOpen}) => {
  const contacts = useAppSelector(selectorContacts);
  const dispatch = useAppDispatch();
  const selectContactById = (id: string) => {
    dispatch(selectContact(id));
    onOpen();
  };

  return (
    <>
      {
        contacts.map((contact: ContactApi) => (
          <ContactViewMemoed
            key={contact.id}
            contact={contact}
            selectContact={selectContactById}
          />
        ))
      }
    </>
  );
};

export default ContactsView;