import {Contact} from '../../types';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {createContact, getContacts, getOneContact, updateContact} from '../../store/ContactThunk';
import {selectorCreateLoading, selectorSingleContact, selectorUpdateContactLoading} from '../../store/ContactSlice';
import {ButtonLoader} from '../../components/ButtonLoader/ButtonLoader';
import {SubmitHandler, useForm} from 'react-hook-form';
import {defaultImage} from '../../constansts/image';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {HOME_PAGE} from '../../constansts/routes';


const NewContact = () => {
  const navigate = useNavigate();
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const singleContact = useAppSelector(selectorSingleContact);
  const createLoading = useAppSelector(selectorCreateLoading);
  const updateLoading = useAppSelector(selectorUpdateContactLoading);
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
    setValue,
  } = useForm<Contact>();


  useEffect(() => {
    if (id) {
      dispatch(getOneContact(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singleContact) {
      Object.keys(singleContact).forEach((key) => {
        const filedName = key as keyof Contact;
        setValue(filedName, singleContact[filedName]);
      });
    }
  }, [setValue, singleContact]);

  const createContactHandler: SubmitHandler<Contact> = async (contact) => {
    if (id) {
      await dispatch(updateContact({id, contact}));
      await dispatch(getContacts());
      reset();
      navigate(HOME_PAGE);
    } else {
      await dispatch(createContact({
        ...contact,
        photo: contact.photo || defaultImage,
      }));
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(createContactHandler)}>
      <h4 className="text-3xl">Add new contact</h4>
      <div className="grid grid-cols-2 my-5">
        <div className="col-span-1 flex flex-col gap-y-3">
          <label className="py-2.5" htmlFor="name">Name</label>
          <label className="py-2.5" htmlFor="phone">Phone</label>
          <label className="py-2.5" htmlFor="email">Email</label>
          <label className="py-2.5" htmlFor="photo">Photo</label>
          <p>Preview photo</p>
        </div>
        <div className="col-span-1 flex flex-col gap-y-3">
          <div>
            <input
              {...register('name', {required: true})}
              className="bg-gray-50 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {
              errors.name &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oh, snapp!</span> Enter your name.
              </p>
            }
          </div>
          <div>
            <input
              {...register('phone', {required: true, pattern: /^\+?[0-9]*$/})}
              className="bg-gray-50 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {
              errors.phone &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oh, snapp!</span> Enter correct data form.
              </p>
            }
          </div>
          <div>
            <input
              {...register('email', {pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})}
              className="bg-gray-50 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {
              errors.email &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oh, snapp!</span> Enter correct data form.
              </p>
            }
          </div>
          <div>
            <input
              {...register('photo', {pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i})}
              className="bg-gray-50 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {
              errors.photo &&
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oh, snapp!</span> Enter correct link image.
              </p>
            }
          </div>
          <div>
            <img
              className="w-[200px] h-[200px] rounded-xl"
              src={watch('photo') ? watch('photo') : defaultImage}
              alt="preview"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-x-3">
        {
          createLoading || updateLoading ?
            <ButtonLoader color="bg-green-700"/>
            :
            <button
              type="submit"
              className="capitalize focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              save
            </button>
        }
        <button
          type="button"
          disabled={createLoading || updateLoading}
          onClick={() => navigate(HOME_PAGE)}
          className="capitalize focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          back to contacts
        </button>
      </div>
    </form>
  );
};

export default NewContact;