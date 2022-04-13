import "./OneChannel.css";
import Messages from "../Messages";
import ChatInput from "../ChatInput";
const OneChannel = () => {
  return (
    <div className="one_channel">
      <Messages className="messages" />
      <ChatInput className="chat_input" />
    </div>
  );
};

export default OneChannel;
