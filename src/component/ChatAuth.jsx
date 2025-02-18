import React from "react";
import ChatBotIcon from "./ChatBotIcon";

const ChatAuth = ({ chat }) => {
  if (chat) {
    return (
      <>
        <div
          className={`message ${
            chat.role === "model" ? "bot" : "user"
          }-message`}
        >
          {chat.role === "model" && <ChatBotIcon />}
          {chat.role === "model" && <p className="message-text">{chat.text}</p>}
          {chat.role === "user" && <div>{chat.text}</div>}
        </div>
      </>
    );
  }
};

export default ChatAuth;
