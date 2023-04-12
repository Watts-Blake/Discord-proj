import "./Messages.css";
import Message from "../Message";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Messages = ({
  handleDeleteMessage,
  handleUpdateMessage,
  messagesLoaded,
  setMessagesLoaded,
}) => {
  let messagesEnd = useRef(null);
  const { channelId, serverId, dmRoomId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    let isActive = true;
    isActive && messagesEnd.current?.scrollIntoView();
    if (isActive && (messages.serverMessages || messages.dmRoomMessages)) {
      setLoaded(true);
    }
    return () => {
      isActive = false;
    };
  }, [messages]);
  if (!loaded) return <h1>Loading...</h1>;

  return (
    loaded && (
      <div className="messages">
        {Object.values(
          dmRoomId
            ? messages.dmRoomMessages[dmRoomId]
            : messages.serverMessages[serverId][channelId]
        ).map((message) => (
          <Message
            message={message}
            handleDeleteMessage={handleDeleteMessage}
            handleUpdateMessage={handleUpdateMessage}
            key={message.id}
          />
        ))}
        <div ref={messagesEnd}></div>
      </div>
    )
  );
};

export default Messages;
