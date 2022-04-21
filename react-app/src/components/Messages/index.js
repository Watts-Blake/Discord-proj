import "./Messages.css";

import { useRef, useEffect } from "react";

const Messages = ({ messages }) => {
  let messagesEnd = useRef(null);
  useEffect(() => {
    let isActive = true;
    isActive && messagesEnd.current?.scrollIntoView();
    return () => {
      isActive = false;
    };
  }, [messages]);
  return (
    <div className="messages">
      {messages?.map((message) => (
        <div className="message" key={message.id}>
          <div className="message_user">
            <img
              className="message_pfp"
              src={message.senderProfilePicture}
              alt="pfp"
            />
          </div>
          <div className="message_content">
            <h4 className="username">{message.senderUsername}</h4>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEnd}></div>
    </div>
  );
};

export default Messages;
