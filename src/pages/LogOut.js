import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

export default class LogOut extends Component {
  constructor (props) {
    super(props);
    this.props.setUser(null);
  }
  render () {
    return ( <Redirect to="/" /> );
  }
}