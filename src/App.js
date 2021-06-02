import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';

import UserContext from './context/AppContext';

import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import ComposeEmail from './pages/ComposeEmail';
import LogIn from './pages/LogIn';
import LogOut from './pages/LogOut';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  const [ userData, setUserData ] = useState({ user: null });
  
  useEffect(() => {
    console.log(userData.user || 'No user data');
    setUserData({ user: JSON.parse(localStorage.getItem('user')) });
  }, [userData.user?.id]);
  
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