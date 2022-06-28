import React, { useContext } from 'react';

import Groceries from './components/Groceries/Groceries';
import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';

const App = props => {
  const authContext = useContext(AuthContext);

  let content = <Auth />;
  if (authContext.isAuth) {
    content = <Groceries />;
  }

  return content;
};

export default App;
