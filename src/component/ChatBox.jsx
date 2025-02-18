import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ChatRoomFrom from "./ChatRoomFrom";
import ChatBotIcon from "./ChatBotIcon";
import ChatAuth from "./ChatAuth";

const ChatBox = ({ roomToChat, setRoomToChat, roomList, setRoomList }) => {
  const list = roomToChat.messHistory;

  const [messageHistory, setMessageHistory] = useState([]);

  const [newMessage, setNewMessage] = useState(null); // Store new messages temporarily

  const botRespone = async (history) => {
    try {
      const formattedHistory = history.map(({ role, text }) => ({
        role,
        parts: [{ text }],
      }));

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        { contents: formattedHistory },
        {
          headers: { "Content-Type": "application/json" },
          params: { key: "AIzaSyDC7W0zDLfunzMLqAIIIcM-J90b-J9fFd8" },
        }
      );

      if (!response.data) throw new Error("Something went wrong!");

      const apiResponse =
        response.data.candidates[0].content.parts[0].text.trim();

      setNewMessage({ role: "model", text: apiResponse }); // Store new message
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    console.log(roomToChat);
    setMessageHistory(roomToChat.messHistory);
  }, [roomToChat, roomList]);

  useEffect(() => {
    if (newMessage) {
      setRoomToChat((prev) => {
        const isFirstMessage = prev.messHistory.length === 0;
        console.log("Boolean:" + isFirstMessage);
        console.log(newMessage);
        const updatedRoom = {
          ...prev,
          messHistory: [...prev.messHistory, newMessage],
          title: isFirstMessage
            ? prev.title
            : newMessage.text.substring(0, 20) + "...", // Set title from first message
        };

        // Update roomList
        const updatedRooms = roomList.map((room) =>
          room.id === updatedRoom.id ? updatedRoom : room
        );
        setRoomList(updatedRooms);
        localStorage.setItem("ROOMLIST", JSON.stringify(updatedRooms));

        return updatedRoom;
      });

      setNewMessage(null);
    }
  }, [newMessage, roomList]);
  return (
    <div className="chat-container">
      <div className="chat-header">Chat Room</div>
      <div className="chat-messages">
        <div className="message bot-massage">
          <ChatBotIcon />
          <p className="message-text">Hello! guy</p>
        </div>

        {messageHistory.length > 0 &&
          messageHistory.map((chat, index) => {
            return <ChatAuth key={index} chat={chat} />;
          })}
      </div>

      <ChatRoomFrom
        messageHistory={messageHistory}
        botRespone={botRespone}
        setMessageHistory={setMessageHistory}
        roomToChat={roomToChat}
        setRoomToChat={setRoomToChat}
        roomList={roomList}
      />
    </div>
  );
};

export default ChatBox;
