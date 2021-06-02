import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import UserContext from '../context/AppContext';

const HomePage = () => {
  const { userData } = useContext(UserContext);
  const [ emailData, setEmailData ] = useState({ emails: null });

  const getEmails = () => {
    let uriAddress = encodeURIComponent(userData.user.address);
    Axios.get(`https://ayoocyry5i.execute-api.us-west-1.amazonaws.com/test/api/emails/${uriAddress}`)
    .then(res => {
      let emails = [];
      for (let email of res.data) {
        emails.push(
          <div className='email' key={email.id}>
            <h3>{email.subject}</h3>
            <p>To: {email.receiver_address}</p>
            <p>From: {email.sender_address}</p>
            <pre>{email.body}</pre>
          </div>
        );
      }
      setEmailData({ emails });
    });
  }
  useEffect(getEmails, [userData.user.address]);

  return (
    <>
    <h1>Hello World!</h1>
    {emailData.emails}
    </>
  );
}

export default HomePage;