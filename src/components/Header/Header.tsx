import {Link} from 'react-router-dom';
import {ADD_NEW_CONTACT, HOME_PAGE} from '../../constansts/routes';

const Header = () => {
  return (
    <div className="bg-purple-800 py-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center text-white">
          <div>
            <Link
              className="text-3xl capitalize"
              to={HOME_PAGE}
            >
              contact
            </Link>
          </div>
          <div>
            <Link
              className="capitalize"
              to={ADD_NEW_CONTACT}
            >
              add new contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;