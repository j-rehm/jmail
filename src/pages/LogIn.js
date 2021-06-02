import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import UserContext from '../context/AppContext';

const LogIn = () => {
  const { setUserData } = useContext(UserContext);

  const logIn = () => {
    let user = {
      id: '7b862545-d35d-4d64-8748-db4c70e3a19c',
      first_name: 'Jeffrey',
      last_name: 'Rehm',
      address: 'jrehm@jmail.com'
    };
    
    setUserData({ user });
    localStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <>
    <Link to='/' onClick={logIn}>
      Log In
    </Link>
    </>
  );
}

export default LogIn;