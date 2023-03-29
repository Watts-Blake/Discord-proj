import "./Message.css";
import MessageOptions from "../MessageOptions";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChatInput from "../ChatInput";

const Message = ({ message, handleDeleteMessage, handleUpdateMessage }) => {
  const [hover, setHover] = useState(false);
  const [options, setOptions] = useState(null);
  const [showEditMessage, setShowEditMessage] = useState(false);

  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers.currentServer);
  const channel = useSelector((state) => state.channels.currentChannel);

  const handleMouseLeave = () => {
    setHover(false);
    setOptions(false);
  };

  return (
    <div
      className={hover === message.id ? "curr_message message" : "message"}
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
        <div className="message_header">
          <h4 className="username">{message.senderUsername}</h4>
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
        </div>
        {showEditMessage !== message.id && <span>{message.content}</span>}
        {showEditMessage === +message.id && (
          <ChatInput
            messageToEdit={message}
            handleUpdateMessage={handleUpdateMessage}
            setShowEditMessage={setShowEditMessage}
            className="chat_input"
          />
        )}
      </div>

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
  );
};

export default Message;
