import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import './index.css';
import './style.css';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import UserContext from './context/AppContext';

import HomeRouter from './components/HomeRouter';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import LogOut from './components/LogOut';

import EmailInbox from './pages/EmailInbox';
// import ComposeEmail from './pages/ComposeEmail';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import PageNotFound from './pages/PageNotFound';

Amplify.configure(awsconfig);

const App = () => {
  const [ userData, setUserData ] = useState({ user: null });
  
  if (!userData.user?.address && localStorage.getItem('user')) {
    setUserData({ user: JSON.parse(localStorage.getItem('user')) });
  }

  // useEffect(() => {
  //   console.log(userData.user || 'No user data');
  // }, [userData.user]);
  
  return (
    <>
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <NavBar />
        <div className="page-container">
          <Switch>
            <Route exact path="/"
                   name='home'>
              <HomeRouter />
            </Route>
            <ProtectedRoute path='/inbox'
                            name='inbox'
              component={EmailInbox}
            />
            {/* <ProtectedRoute exact path='/compose'
                            name='compose'
              component={ComposeEmail}
            /> */}
            {/* <ProtectedRoute path='/compose/:threadId'
              component={ComposeEmail}
            /> */}
            <Route path='/signup'
                   name='signup'>
              <SignUp />
            </Route>
            <Route path='/login'
                   name='login'>
              <LogIn />
            </Route>
            <Route path='/logout'
                   name='logout'>
              <LogOut />
            </Route>
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
    </>
  );
}

export default App;