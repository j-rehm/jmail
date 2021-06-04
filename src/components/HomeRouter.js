import React, { useContext } from 'react';
import { Redirect } from 'react-router';

import UserContext from '../context/AppContext';

const HomeRouter = () => {
  const { userData } = useContext(UserContext);

  return (
    userData.user?.address
    ? <Redirect to="inbox" />
    : <Redirect to="login" />
  )
}

export default HomeRouter