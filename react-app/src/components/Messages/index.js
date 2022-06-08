import "./Messages.css";
import MessageOptions from "../MessageOptions";

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
  console.log(options);
  const handleMouseLeave = () => {
    setHover(false);
    setOptions(false);
  };
  return (
    <div className="messages">
      {messages?.map((message) => (
        <div
          className={hover === message.id ? "curr_message" : "message"}
          key={message.id}
          onMouseOver={() => setHover(message.id)}
          onMouseLeave={handleMouseLeave}
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
            {showEditMessage !== message.id && <span>{message.content}</span>}
            {showEditMessage === message.id && (
              <ChatInput
                content={message.content}
                handleUpdateMessage={handleUpdateMessage}
                editing={true}
              />
            )}
          </div>
          {hover === message.id && message.senderId !== 1 && (
            <div className="message_more">
              <button
                onClick={() => (options ? setOptions(false) : setOptions(true))}
              >
                <img
                  src="/svgs/dot-dot.svg"
                  alt="more"
                  className="delete"
                ></img>
              </button>
            </div>
          )}
          {options && message.id === hover && (
            <MessageOptions
              handleDeleteMessage={handleDeleteMessage}
              message={message}
              user={user}
              server={server}
              channel={channel}
              setShowEditMessage={setShowEditMessage}
            />
          )}
        </div>
      ))}
      <div ref={messagesEnd}></div>
    </div>
  );
};

export default Messages;
