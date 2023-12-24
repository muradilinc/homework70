import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectorContacts, selectorFetchContactsLoading} from '../../store/ContactSlice';
import {getContacts} from '../../store/ContactThunk';
import {placeholderImage} from '../../constansts/image';
import Spinner from '../../components/Spinner/Spinner';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectorContacts);
  const fetchLoading = useAppSelector(selectorFetchContactsLoading);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <div>
      {
        fetchLoading ?
          <Spinner/>
          :
          contacts.map(contact => (
            <div className="grid grid-cols-2 items-center border border-black p-2">
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
    </div>
  );
};

export default HomePage;