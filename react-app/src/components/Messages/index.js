import "./Messages.css";

import { useRef, useEffect } from "react";

const Messages = ({ messages }) => {
  const messagesEnd = useRef(null);
  useEffect(() => {
    messagesEnd.current?.scrollIntoView();
  }, [messages]);
  return (
    <div className="messages">
      {messages?.map((message) => (
        <div className="message" key={message.id}>
          <img
            className="message_pfp"
            src={message.senderProfilePicture}
            alt="pfp"
          />
          <div className="message_content">
            <h4>{message.senderUsername}</h4>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEnd}></div>
    </div>
  );
};

export default Messages;
