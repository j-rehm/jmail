import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class LogIn extends Component {
  render () {
    return (
      <>
      <Link to='/' onClick={() => this.props.setUser({ address: 'jrehm@jmail.com' })}>Log In</Link>
      </>
    );
  }
}