import "./Messages.css";
import MessageOptions from "../MessageOptions";
import Message from "../Message";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatInput from "../ChatInput";

const Messages = ({ messages, handleDeleteMessage, handleUpdateMessage }) => {
  const [hover, setHover] = useState(false);
  const [options, setOptions] = useState(null);
  const [showEditMessage, setShowEditMessage] = useState(false);

  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers.currentServer);
  const channel = useSelector((state) => state.channels.currentChannel);

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
