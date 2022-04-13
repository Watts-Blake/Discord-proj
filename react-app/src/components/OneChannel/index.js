import "./OneChannel.css";
import Messages from "../Messages";
import ChatInput from "../ChatInput";
const OneChannel = ({ channelsObj }) => {
  const currentChannel = channelsObj?.currentChannel;
  return (
    <div>
      <h4># {currentChannel?.name}</h4>
      <div className="one_channel">
        {currentChannel?.messages && (
          <Messages
            messages={Object.values(currentChannel?.messages)}
            className="messages"
          />
        )}
        <ChatInput className="chat_input" />
      </div>
    </div>
  );
};

export default OneChannel;
