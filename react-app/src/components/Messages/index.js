import "./Messages.css";

const Messages = ({ messages }) => {
  return messages?.map((message) => (
    <div className="message" key={message.id}>
      <img
        className="message_pfp"
        src={message.senderProfilePicture}
        alt="pfp"
      />
      <div className="message_content">
        <h4>{message.senderUsername}</h4>
        <p>{message.content}</p>
      </div>
    </div>
  ));
};

export default Messages;
