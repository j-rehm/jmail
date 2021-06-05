import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import Axios from 'axios';

import UserContext from '../context/AppContext';

const ComposeEmail = props => {
  const { userData } = useContext(UserContext);

  const [messageSubject, setMessageSubject] = useState(props.messageSubject);
  const [messageBody, setMessageBody] = useState(props.messageBody);
  const [receiverAddress, setRecieverAddress] = useState(props.senderAddress);
  
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const submitComposeForm = evt => {
    evt.preventDefault();
    const postBody = {
      subject: messageSubject,
      body: messageBody.replaceAll('\n', '\\n').replaceAll('\r', '\\r'),
      sender_address: userData.user.address,
      receiver_address: receiverAddress,
    };
    if (props.threadId) postBody.thread_id = props.threadId;
    console.log(JSON.stringify(postBody));
    Axios.post('https://ayoocyry5i.execute-api.us-west-1.amazonaws.com/test/api/email', postBody)
    .then(res => {
      if (res.data.id) setIsSent(true);
      else setError('An unknown error occured');
    });
  }

  if (isSent) return <Redirect to='inbox' />;
  else {
    return (
      <form className="compose-form card"
            onSubmit={submitComposeForm}>
        {/* <h2 className="form-header">New Message</h2> */}

        <input className="form-input message-subject"
               placeholder="Message Subject"
               value={messageSubject}
               required
               onChange={(e) => setMessageSubject(e.target.value)}
        />
        <br />

        <input className="form-input-label message-receiver"
               placeholder="Receiver address"
               value={receiverAddress}
               required
               onChange={(e) => setRecieverAddress(e.target.value)}
        />
        <br />

        <textarea className="form-input message-body"
                  placeholder="Message Body"
                  value={messageBody}
                  required
                  onChange={(e) => setMessageBody(e.target.value)}
        />
        <br />

        <input className="form-submit-btn"
               type="submit"
               value="Send"
        />
        <br />

        {error
          ? <span className="form-error">{error}</span>
          : <></>
        }
      </form>
    );
  }
}

export default ComposeEmail;