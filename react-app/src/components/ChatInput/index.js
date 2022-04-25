import "./ChatInput.css";
import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";

import "draft-js/dist/Draft.css";

const ChatInput = ({ sendMessage }) => {
  const userId = useSelector((state) => state.session.user.id);
  const [chatContent, setChatContent] = useState("");
  // const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("content", chatContent);
    formData.append("senderId", userId);
    // if (image) formData.append("image", image);
    sendMessage(formData);
    setChatContent("");
  };

  return (
    <form className="chat_input" onSubmit={handleSubmit}>
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
