import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getOneContact} from '../../store/ContactThunk';
import {selectorFetchSingleLoading, selectorSelectById, selectorSingleContact} from '../../store/ContactSlice';
import {Link} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import {placeholderImage} from '../../constansts/image';
import BackDrop from '../BackDrop/BackDrop';

interface Props {
  onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({onClose}) => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectorSelectById);
  const singleContact = useAppSelector(selectorSingleContact);
  const getOneLoading = useAppSelector(selectorFetchSingleLoading);

  useEffect(() => {
    dispatch(getOneContact(id));
  }, [dispatch, id]);

  if (singleContact) {
    return (
      <>
        <BackDrop onClose={onClose}/>
        <div className="fixed inset-0 flex items-center justify-center bg-red-600">
          {
            getOneLoading ?
              <Spinner/>
              :
              <div className="relative w-full max-w-3xl max-h-full ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={onClose}
                    >
                      X
                    </button>
                  </div>
                  <div className="p-4 md:p-5 space-y-4">
                    <div className="flex items-center gap-x-3">
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
                  </div>
                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="default-modal" type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Edit
                    </button>
                    <button data-modal-hide="default-modal" type="button"
                            className="ms-3 text-white bg-red-600 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >Delete
                    </button>
                  </div>
                </div>
              </div>
          }
        </div>
      </>
    );
  }
};

export default Modal;