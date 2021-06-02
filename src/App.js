import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import UserContext from './context/AppContext';

import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import LogOut from './components/LogOut';

import HomePage from './pages/HomePage';
import ComposeEmail from './pages/ComposeEmail';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import PageNotFound from './pages/PageNotFound';

Amplify.configure(awsconfig);

const App = () => {
  const [ userData, setUserData ] = useState({ user: null });
  
  if (!userData.user?.address && localStorage.getItem('user')) {
    setUserData({ user: JSON.parse(localStorage.getItem('user')) });
  }

  useEffect(() => {
    console.log(userData.user || 'No user data');
  }, [userData.user]);
  
  return (
    <>
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <NavBar />
        <Switch>
          <ProtectedRoute exact path='/'
            component={HomePage}
          />
          <ProtectedRoute path='/compose'
            component={ComposeEmail}
          />
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <LogIn />
          </Route>
          <Route path='/logout'>
            <LogOut />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
    </>
  );
}

export default App;