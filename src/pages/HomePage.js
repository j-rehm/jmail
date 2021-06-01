import React, { Component } from 'react';

export default class HomePage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      emails: []
    }
  }

  componentDidMount () {
    // console.log(this.props);
    let uriAddress = encodeURIComponent(this.props.user.address);
    fetch(`https://ayoocyry5i.execute-api.us-west-1.amazonaws.com/test/api/emails/${uriAddress}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      let emailsDOM = [];
      for (let email of data) {
        emailsDOM.push(
          <div className='email-message' id={email.id} key={email.id}>
            <h3>{email.subject}</h3>
            <p>To: {email.receiver_address}</p>
            <p>From: {email.sender_address}</p>
            <pre>{email.body}</pre>
          </div>
        );
      }
      this.setState({
        emails: emailsDOM
      });
    });
  }

  render () {
    return (
      <>
      <h1>Hello World!</h1>
      {this.state.emails}
      </>
    );
  }
}