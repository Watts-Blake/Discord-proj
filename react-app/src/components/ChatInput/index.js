import "./ChatInput.css";
import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "draft-js/dist/Draft.css";

const ChatInput = ({
  sendMessage,
  handleUpdateMessage,
  messageToEdit,
  setShowEditMessage,
}) => {
  const userId = useSelector((state) => state.session.user.id);
  //if messageToEdit true, set default value of chat content to message.content
  const [chatContent, setChatContent] = useState(
    messageToEdit ? messageToEdit.content : ""
  );
  // const [image, setImage] = useState("");
  const { dmRoomId } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatContent) return;
    let formData = new FormData();

    const messageToSend = {
      content: chatContent,
    };

    // if (image) messageToEdit.image = image
    formData.append("content", chatContent);
    formData.append("senderId", userId);
    // if (image) formData.append("image", image);
    if (messageToEdit) {
      handleUpdateMessage({
        message_id: messageToEdit.id,
        content: messageToSend.content,
      });
      setShowEditMessage(false);
    } else {
      // sendMessage(formData);
      sendMessage(messageToSend);
    }

    setChatContent("");
  };

  return (
    <form
      id={dmRoomId && !messageToEdit ? "dm_room_chat" : null}
      className={
        dmRoomId && !messageToEdit ? "dm_room chat_input" : "chat_input"
      }
      onSubmit={handleSubmit}
    >
      <input
        className="chat_form_input"
        placeholder="Send a message!"
        onChange={(e) => setChatContent(e.target.value)}
        value={chatContent}
      />
    </form>
  );
};

export default ChatInput;
