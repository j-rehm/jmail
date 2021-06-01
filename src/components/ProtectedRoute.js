// https://github.com/DeryGermann/Capstone/blob/main/Client/src/components/protected_route.js
import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
    return(
        <Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}

export default ProtectedRoute;