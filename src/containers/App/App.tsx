import NewContact from '../NewContact/NewContact';
import Layout from '../../components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import {ADD_NEW_CONTACT, HOME_PAGE} from '../../constansts/routes';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={HOME_PAGE} element={<HomePage/>}/>
          <Route path={ADD_NEW_CONTACT} element={<NewContact/>}/>
        </Routes>
      </Layout>
    </>
  );
};

export default App;