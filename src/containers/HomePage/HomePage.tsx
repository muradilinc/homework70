import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectorFetchContactsLoading} from '../../store/ContactSlice';
import {getContacts} from '../../store/ContactThunk';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import {Outlet, useParams} from 'react-router-dom';
import {HOME_PAGE} from '../../constansts/routes';
import ContactsView from '../../components/ContactsView/ContactsView';

const HomePage = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const fetchLoading = useAppSelector(selectorFetchContactsLoading);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.pathname === HOME_PAGE) {
      dispatch(getContacts());
    }
  }, [dispatch]);

  if (id) {
    return <Outlet/>;
  }

  return (
    <div className="flex flex-col gap-y-3">
      {
        fetchLoading ?
          <Spinner/>
          :
          <ContactsView onOpen={() => setShowModal(true)}/>
      }
      {
        showModal && <Modal onClose={() => setShowModal(false)}/>
      }
    </div>
  );
};

export default HomePage;