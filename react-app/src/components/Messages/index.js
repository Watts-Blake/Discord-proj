import "./Messages.css";

import { useRef, useEffect } from "react";
import { useState } from "react";

const Messages = ({ messages }) => {
  const [hover, setHover] = useState(false);
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
        <div
          className={hover === message.id ? "curr_message" : "message"}
          key={message.id}
          onMouseOver={() => setHover(message.id)}
          onMouseLeave={() => setHover(false)}
        >
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
          {hover === message.id && (
            <img src="/svgs/dot-dot.svg" alt="more" className="delete"></img>
          )}
        </div>
      ))}
      <div ref={messagesEnd}></div>
    </div>
  );
};

export default Messages;
