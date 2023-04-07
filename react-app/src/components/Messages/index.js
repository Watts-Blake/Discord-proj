import "./Messages.css";
import Message from "../Message";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Messages = ({ handleDeleteMessage, handleUpdateMessage }) => {
  let messagesEnd = useRef(null);

  const messages = useSelector((state) => Object.values(state.messages));

  useEffect(() => {
    let isActive = true;
    isActive && messagesEnd.current?.scrollIntoView();
    return () => {
      isActive = false;
    };
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((message) => (
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
