import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  render () {
    return (
      <>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/compose'>Compose</Link></li>
          {this.props.auth
            ? <li><Link to='/logout'>Log Out</Link></li>
            : <li><Link to='/login'>Log In</Link></li>}
        </ul>
      </nav>
      </>
    );
  }
}