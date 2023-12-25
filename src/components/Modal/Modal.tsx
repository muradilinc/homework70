import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {deleteContact, getContacts, getOneContact} from '../../store/ContactThunk';
import {selectorFetchSingleLoading, selectorSelectById, selectorSingleContact} from '../../store/ContactSlice';
import {Link, useNavigate} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import {placeholderImage} from '../../constansts/image';
import {EDIT_CONTACT} from '../../constansts/routes';

interface Props {
  onClose: () => void;
}

const Modal: React.FC<Props> = ({onClose}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectorSelectById);
  const singleContact = useAppSelector(selectorSingleContact);
  const getOneLoading = useAppSelector(selectorFetchSingleLoading);

  useEffect(() => {
    dispatch(getOneContact(id));
  }, [dispatch, id]);

  const onDelete = async () => {
    await dispatch(deleteContact(id));
    await dispatch(getContacts());
    onClose();
  };

  if (singleContact) {
    return (
      <div
        className="fixed bg-black/20 inset-0 flex justify-center items-center"
        onClick={onClose}
      >
        {
          getOneLoading ?
            <Spinner/>
            :
            <div
              className="bg-white rounded-xl shadow p-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex border-b-2">
                <button
                  type="button"
                  className="text-gray-400 my-2 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
                >
                  X
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="flex my-3 items-center gap-x-3">
                <img className="w-[40%] h-[200px]" src={singleContact.photo || placeholderImage} alt="ava"/>
                <div className="flex flex-col">
                  <h3 className="text-4xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {singleContact.name}
                  </h3>
                  <p>Phone: <Link className="underline"
                                  to={`tel:${singleContact.phone}`}>{singleContact.phone}</Link></p>
                  <p>Mail: <Link className="underline"
                                 to={`mailto:${singleContact.email}`}>{singleContact.email}</Link></p>
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => navigate(`${EDIT_CONTACT}/${id}`)}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={onDelete}
                  type="button"
                  className="ms-3 text-white bg-red-600 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Delete
                </button>
              </div>
            </div>
        }
      </div>
    );
  }
};

export default Modal;
