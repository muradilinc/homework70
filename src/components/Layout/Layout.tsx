import React, {PropsWithChildren} from 'react';
import Header from '../Header/Header';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className="container mx-auto py-3">
        {children}
      </main>
    </>
  );
};

export default Layout;