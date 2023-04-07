import "./Messages.css";
import Message from "../Message";
import { useRef, useEffect, useState } from "react";

const Messages = ({ messages, handleDeleteMessage, handleUpdateMessage }) => {
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
      {Object.values(messages).map((message) => (
        <Message
          message={message}
          handleDeleteMessage={handleDeleteMessage}
          handleUpdateMessage={handleUpdateMessage}
          key={message.id}
        />
      ))}
      <div ref={messagesEnd}></div>
    </div>
  );
};

export default Messages;
