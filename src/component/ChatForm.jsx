import React, { useReducer, useRef, useState } from "react";

const ChatForm = ({ messageHistory, setMessageHistory, botRespone }) => {
  const [message, setMessage] = useState();
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    console.log(userMessage);
    console.log(messageHistory);
    if (!userMessage) return;
    setMessageHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);
    inputRef.current.value = "";
    setTimeout(() => {
      setMessageHistory((history) => [
        ...history,
        { role: "model", text: "Waiting me..." },
      ]);
      botRespone([...messageHistory, { role: "user", text: userMessage }]);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <input
        ref={inputRef}
        placeholder="Message..."
        className="message-input"
        required
      />
      <button
        type="submit"
        id="send-message"
        className="material-symbols-rounded"
      >
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
