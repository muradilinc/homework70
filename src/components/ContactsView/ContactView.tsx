import React from 'react';
import {placeholderImage} from '../../constansts/image';
import {ContactApi} from '../../types';

interface Props {
  contact: ContactApi;
  selectContact: (id: string) => void;
}

const ContactViewMemoed: React.FC<Props> = React.memo(function ContactsView ({contact, selectContact}) {
  return (
    <div
      key={contact.id}
      className="grid grid-cols-2 items-center border border-black p-2"
      onClick={() => selectContact(contact.id)}
    >
      <div className="w-[300px] h-[200px]">
        <img
          className="w-full h-full"
          src={contact.photo || placeholderImage}
          alt="avatar"
        />
      </div>
      <div>
        <h4 className="text-4xl">{contact.name}</h4>
      </div>
    </div>
  );
}, (nextProps, prevProps) => {
  return prevProps.contact !== nextProps.contact;
});

export default ContactViewMemoed;