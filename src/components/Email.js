import React from 'react';

const Email = props => {
  return (
    <div className="email card">
      <h2 className="message-subject">{props.messageSubject}</h2>
      <p className="message-receiver">
        <span className="bold">To:</span> {props.receiverAddress}
      </p>
      <p className="message-sender">
        <span className="bold">From:</span> {props.senderAddress}
      </p>
      <pre className="message-body">{props.messageBody}</pre>
    </div>
  );
}

export default Email;