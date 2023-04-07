import "./Message.css";
import MessageOptions from "../MessageOptions";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChatInput from "../ChatInput";

const Message = ({ message, handleDeleteMessage, handleUpdateMessage }) => {
  const [hover, setHover] = useState(false);
  const [options, setOptions] = useState(null);
  const [showEditMessage, setShowEditMessage] = useState(false);
  const checkIfToday = (date) => {
    const today = new Date().getDay();
    const dateToCheck = new Date(date).getDay();
    if (today === dateToCheck) {
      return true;
    } else {
      return false;
    }
  };
  const checkIfYesterday = (date) => {
    const yesterday = new Date().getDay() - 1;
    const dateToCheck = new Date(date).getDay();
    if (yesterday === dateToCheck) {
      return true;
    } else {
      return false;
    }
  };

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
          <div className="message_header_left">
            <p className="username">{message.senderUsername}</p>
            <div className="message_time">
              <p>
                {checkIfToday(message.createdAt)
                  ? "Today"
                  : checkIfYesterday(message.createdAt)
                  ? "Yesterday"
                  : new Date(message.createdAt).toLocaleDateString()}
              </p>
              <p>at</p>
              <p>
                {new Date(message.createdAt).toLocaleTimeString("locales", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
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
        </div>
        {showEditMessage !== message.id && (
          <div className="message_content_message_container">
            <span className="message_content_message">{message.content}</span>
            {message.updatedAt && (
              <p className="message_content_edited_message">(edited)</p>
            )}
          </div>
        )}
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
