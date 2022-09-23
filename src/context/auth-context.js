import React, { useState } from 'react';
import Cookies from 'universal-cookie';

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {}
});

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const cookies = new Cookies();
    
  const user = cookies.get('rustyshops-user');

  if (user && !isAuthenticated) {
    setIsAuthenticated(true);
  }

  const loginHandler = () => {
    const user = cookies.get('rustyshops-user');

    if (!user) {
      // Authenticate
      cookies.set('rustyshops-user', 'Some User');
    }

    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;