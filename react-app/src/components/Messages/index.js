import "./Messages.css";
import MessageOptions from "../MessageOptions";

import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Messages = ({ messages }) => {
  const [hover, setHover] = useState(false);
  const [options, setOptions] = useState(null);

  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers.currentServer);
  console.log(messages[0], user, server);

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
            <p>{message.content}</p>
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
            <MessageOptions message={message} user={user} server={server} />
          )}
        </div>
      ))}
      <div ref={messagesEnd}></div>
    </div>
  );
};

export default Messages;
