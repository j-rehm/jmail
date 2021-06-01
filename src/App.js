import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';

import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import ComposeEmail from './pages/ComposeEmail';
import LogIn from './pages/LogIn';
import LogOut from './pages/LogOut';
import PageNotFound from './pages/PageNotFound';

export default class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      auth: false,
      user: null
    }
  }

  setUser = value => {
    this.setState({
      auth: !!value,
      user: value
    });
  }
  
  render () {
    return (
      <>
      <Router>
        <NavBar
          auth={this.state.auth}
        />
        <Switch>
          <ProtectedRoute
            exact path='/'
            auth={this.state.auth}
            component={() =>
              <HomePage
                auth={this.state.auth}
                user={this.state.user}
              />
            }
          />
          <ProtectedRoute
            path='/compose'
            auth={this.state.auth}
            component={() =>
              <ComposeEmail
                auth={this.state.auth}
                user={this.state.user}
              />
            }
          />
          <Route
            path='/login'
            render={() =>
              <LogIn
                setUser={this.setUser}
              />
            }
          />
          <Route
            path='/logout'
            render={() =>
              <LogOut
                setUser={this.setUser}
              />
            }
          />
          <Route
            path='*'
            component={PageNotFound}
          />
        </Switch>
      </Router>
      </>
    );
  }
}
