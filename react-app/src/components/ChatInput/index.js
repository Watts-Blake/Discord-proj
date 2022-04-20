import "./ChatInput.css";
import { useState } from "react";
import React from "react";

import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const ChatInput = () => {
  const [chatContent, setChatContent] = useState("");
  console.log(chatContent);

  return (
    <form className="chat_input">
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
