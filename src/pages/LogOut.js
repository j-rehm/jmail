import React, { useContext, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import UserContext from '../context/AppContext';

const LogOut = () => {
  const { setUserData } = useContext(UserContext);

  const logOut = () => {
    setUserData({ user: null });
    localStorage.removeItem('user');
  }
  useEffect(logOut);

  return <Redirect to='/' />
}

export default LogOut;