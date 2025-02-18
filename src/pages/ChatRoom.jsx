import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import ChatBox from "../component/ChatBox";

const ChatRoom = () => {
  const [roomList, setRoomList] = useState(() => {
    try {
      const savedRooms = localStorage.getItem("ROOMLIST");
      return savedRooms ? JSON.parse(savedRooms) : [];
    } catch (error) {
      console.error("Error parsing room list from localStorage:", error);
      return [];
    }
  });
  const [roomToChat, setRoomToChat] = useState({
    id: 0,
    title: "abc",
    messHistory: [],
  });

  useEffect(() => {
    if (roomList.length === 0) {
      const defaultRooms = [
        {
          id: 1,
          title: "Tổng bí thư chủ tịch nước",
          messHistory: [
            { role: "user", text: "daev" },
            {
              role: "model",
              text: "dvczbskbfc zcjvsdvz jxvasxcv  Jvbsdcb zvdfscbl",
            },
          ],
        },
        { id: 2, title: "Hôm nay có mưa ko", messHistory: [] },
        { id: 3, title: "Hôm nay ko có mưa ", messHistory: [] },
      ];
      setRoomList(defaultRooms);
      localStorage.setItem("ROOMLIST", JSON.stringify(defaultRooms));
    }
  }, []);
  // Run when roomList changes

  const addRoom = () => {
    const newRoom = {
      id: uuidv4(),
      title: "New Chat Room",
      messHistory: [],
    };
    const updatedRooms = [newRoom, ...roomList];

    setRoomList(updatedRooms);
    localStorage.setItem("ROOMLIST", JSON.stringify(updatedRooms)); // Save updated list
  };

  const deleted = (id) => {
    const itemAfterDeleting = roomList.filter((item) => item.id !== id);
    setRoomList(itemAfterDeleting);
    localStorage.setItem("ROOMLIST", JSON.stringify(itemAfterDeleting));
  };

  const chooseRoom = (room) => {
    setRoomToChat(room);
  };

  return (
    <div className="body">
      <div className="history">
        <button
          onClick={addRoom}
          type="button"
          className="btn btn-outline-success"
        >
          + New chat
        </button>
        <div className="room-list">
          {roomList.map((room) => (
            <div
              key={room.id}
              className="room-item"
              onClick={() => {
                chooseRoom(room);
              }}
            >
              <p className="name">{room.title}</p>{" "}
              <FaTrash onClick={() => deleted(room.id)} />
            </div>
          ))}
        </div>
      </div>
      <ChatBox
        roomToChat={roomToChat}
        setRoomToChat={setRoomToChat}
        roomList={roomList}
        setRoomList={setRoomList}
      />
    </div>
  );
};

export default ChatRoom;
