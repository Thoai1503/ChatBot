import React, { useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatBotIcon from "../component/ChatBotIcon";
import ChatForm from "../component/ChatForm";
import ChatMessage from "../component/ChatMessage";
import axios from "axios";

const Chat = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [showChatBot, setShowChatBot] = useState(false);
  const chatBody = useRef();
  const botRespone = async (history) => {
    const updateHistory = (text) => {
      setMessageHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Waiting me..."),
        { role: "model", text },
      ]);
    };

    try {
      const formattedHistory = history.map(({ role, text }) => ({
        role,
        parts: [{ text }],
      }));
      console.log("Format :" + formattedHistory);

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        { contents: formattedHistory },
        {
          headers: { "Content-Type": "application/json" },
          params: { key: "AIzaSyDC7W0zDLfunzMLqAIIIcM-J90b-J9fFd8" },
        }
      );

      if (!response.data)
        throw new Error(response.data.error.message || "Something went wrong!");

      console.log(response.data);
      const apiRespone =
        response.data.candidates[0].content.parts[0].text.trim();
      updateHistory(apiRespone);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error?.message || "Something went wrong!"
      );
    }
  };

  useEffect(() => {
    chatBody.current.scrollTo({
      top: chatBody.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messageHistory]);

  return (
    <div>
      <h1>Chat</h1>

      <Row style={{ width: 1546 }}>
        <Col md={8} style={{ border: "solid black 1px" }}>
          md=8
        </Col>
        <Col md={4} style={{ border: "solid black 1px" }}>
          md=4
        </Col>
        <div className={`container ${showChatBot ? "show-chatbot" : ""}`}>
          <button
            id="chatbot-toggler"
            onClick={() => setShowChatBot((pre) => !pre)}
          >
            <span class="material-symbols-outlined">chat_bubble</span>
            <span aria-hidden="true" style={{ fontSize: 35 }}>
              &times;
            </span>
          </button>

          <div className="chatbot-popup">
            <div className="chat-header">
              <div className="header-info">
                <ChatBotIcon />
                <h2 className="logo-text">Chatbot</h2>
              </div>
              <button className="material-symbols-rounded">
                keyboard_arrow_down
              </button>
            </div>
            <div ref={chatBody} className="chat-body">
              <div className="message bot-message">
                <ChatBotIcon />
                <p className="message-text">
                  Hi there
                  <br />
                  How can I help you today?
                </p>
              </div>

              {messageHistory.map((chat, index) => {
                return <ChatMessage key={index} chat={chat} />;
              })}
            </div>
            <div className="chat-footer">
              <ChatForm
                messageHistory={messageHistory}
                setMessageHistory={setMessageHistory}
                botRespone={botRespone}
              />
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Chat;
