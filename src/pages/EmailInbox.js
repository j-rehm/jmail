import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import ComposeEmail from '../components/ComposeEmail';
import Email from '../components/Email'

import UserContext from '../context/AppContext';

const EmailInbox = () => {
  const { userData } = useContext(UserContext);
  
  const [emails, setEmails] = useState(null);
  
  // const [emailId, setEmailId] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [datetime, setDatetime] = useState(0);
  const [threadId, setThreadId] = useState('');

  const [displayEmail, setDisplayEmail] = useState(false);
  const [displayCompose, setDisplayCompose] = useState(false);

  const resetDisplay = () => {
    // setEmailId('')
    setMessageSubject('');
    setMessageBody('');
    setSenderAddress('');
    setReceiverAddress('');
    setDatetime(0);
    setThreadId('');
    setDisplayEmail(false);
    setDisplayCompose(false);
  }

  const selectEmail = (email) => {
    setDisplayCompose(false);
    // setEmailId(email.id);
    setMessageSubject(email.subject);
    setMessageBody(email.body.replaceAll('\\r', '\r').replaceAll('\\n', '\n'));
    setSenderAddress(email.sender_address);
    setReceiverAddress(email.receiver_address);
    setDatetime(parseInt(email.datetime));
    setThreadId(email.thread_id);
    setDisplayEmail(true);
  }

  const composeNew = () => {
    resetDisplay();
    setDisplayCompose(true);
  }

  const composeReply = () => {
    const createBody = () => {
      const sent = new Date(datetime).toLocaleDateString('en-US', {
        timeZone: 'America/Boise',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      return `\n\n  From: ${senderAddress}`+
               `\n  To: ${receiverAddress}`+
               `\n  Sent: ${sent}`+
               `\n  Subject: ${messageSubject}`+
             `\n\n  ${messageBody.replaceAll('\n', '\n  ')}`;
    }

    setDisplayEmail(false);
    setMessageBody(createBody());
    setMessageSubject(messageSubject.includes('Re: ')? messageSubject : `Re: ${messageSubject}`);
    setDisplayCompose(true);
  }
  
  const getEmails = () => {
    resetDisplay();
    const createEmailDOM = email => {
      let emailDOM = (
        <div className='email-preview card'
             key={email.id}
             onClick={() => selectEmail(email)}>
          <h4 className="message-subject">{email.subject}</h4>
          <p className="message-sender">{email.sender_address}</p>
          <p className="message-body">{email.body}</p>
        </div>
      );
  
      return emailDOM;
    }

    setEmails(null);
    let uriAddress = encodeURIComponent(userData.user.address);
    Axios.get(`https://ayoocyry5i.execute-api.us-west-1.amazonaws.com/test/api/emails/${uriAddress}`)
    .then(res => {
      let emailList = [];
      if (res.data.length) {
        for (let email of res.data) {
          emailList.unshift(createEmailDOM(email));
        }
      }
      setEmails(emailList);
    });
  }
  useEffect(getEmails, [userData.user.address]);

  return (
    <>
    <div className="email-controls">
      <h3>Inbox</h3>
      <button onClick={composeNew}>Compose</button>
      <button onClick={getEmails}>Refresh</button>
      {displayEmail
        ? <button onClick={composeReply}>Reply</button>
        : <></>
      }
    </div>
    <div className="email-interface row">
      <div className="email-list col">
        {emails}
      </div>
      <div className="email-viewport">
        {displayEmail
          ? <Email messageBody={messageBody}
                   messageSubject={messageSubject}
                   senderAddress={senderAddress}
                   receiverAddress={receiverAddress}
          />
          : displayCompose
            ? <ComposeEmail messageBody={messageBody}
                            messageSubject={messageSubject}
                            senderAddress={senderAddress}
                            threadId={threadId}
              />
            : <></>
        }
      </div>
    </div>
    </>
  );
}

export default EmailInbox;