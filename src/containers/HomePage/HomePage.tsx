import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectContact, selectorContacts, selectorFetchContactsLoading} from '../../store/ContactSlice';
import {getContacts} from '../../store/ContactThunk';
import {placeholderImage} from '../../constansts/image';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectorContacts);
  const fetchLoading = useAppSelector(selectorFetchContactsLoading);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const selectContactById = (id: string) => {
    dispatch(selectContact(id));
    setShowModal(true);
  }

  return (
    <div className="flex flex-col gap-y-3">
      {
        fetchLoading ?
          <Spinner/>
          :
          contacts.map(contact => (
            <div
              className="grid grid-cols-2 items-center border border-black p-2"
              onClick={() => selectContactById(contact.id)}
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
          ))
      }
      {
        showModal && <Modal onClose={() => setShowModal(false)}/>
      }
    </div>
  );
};

export default HomePage;