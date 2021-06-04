import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";

import UserContext from '../context/AppContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(UserContext);

  return(
    <Route {...rest} render={(props) => (
        userData.user?.address
          ? <Component {...props} />
          : <Redirect to='login' />
      )}
    />
  );
}

export default ProtectedRoute;