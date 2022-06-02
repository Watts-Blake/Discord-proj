import "./Messages.css";

import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Messages = ({ messages }) => {
  const [hover, setHover] = useState(false);

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
          {hover === message.id && message.senderId !== 1 && (
            <div className="message_more">
              <img src="/svgs/dot-dot.svg" alt="more" className="delete"></img>
              {(user.id === message.senderId ||
                user.id === server.owner.id) && (
                <img src="/svgs/pencil.svg" alt="edit" className="edit" />
              )}
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEnd}></div>
    </div>
  );
};

export default Messages;
