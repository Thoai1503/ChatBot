import React, { useRef, useState } from "react";

const ChatRoomFrom = ({
  messageHistory,
  botRespone,
  setMessageHistory,
  setRoomToChat,
  roomToChat,
  roomList,
}) => {
  const [message, setMessage] = useState();
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    console.log(userMessage);
    console.log(messageHistory);

    const updatedRoom = {
      ...roomToChat,
      messHistory: [
        ...roomToChat.messHistory,
        { role: "user", text: userMessage },
      ],
    };

    setRoomToChat(updatedRoom);

    // Update roomList and localStorage
    const updatedRooms = roomList.map((room) =>
      room.id === updatedRoom.id ? updatedRoom : room
    );
    //  setRoomList(updatedRooms);
    localStorage.setItem("ROOMLIST", JSON.stringify(updatedRooms));

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
    <form className="chat-input" onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" placeholder="Type a message..." />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatRoomFrom;
