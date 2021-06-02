import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import Auth from '@aws-amplify/auth';

import UserContext from '../context/AppContext';

const LogOut = () => {
  const { setUserData } = useContext(UserContext);

  const logOut = () => {
    try {
      setUserData({ user: null });
      localStorage.removeItem('user');
      Auth.signOut();
    } catch (e) {}
  }
  logOut();

  return <Redirect to='/' />
}

export default LogOut;