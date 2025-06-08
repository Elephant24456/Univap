import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import "./ChatList.css";
import FloatingActionButton from "../components/FloatingActionButton";

const ChatList = () => {
  const [chatData, setChatData] = useState([]);
  const [activeTab, setActiveTab] = useState("chatlist");
  const navigate = useNavigate();

  // //  닉네임 로컬스토리지에서 불러오기
  // useEffect(() => {
  //   const storedNickname = localStorage.getItem('nickname');
  //   if (storedNickname) {
  //     setNickname(storedNickname);
  //   } else {
  //     setNickname('익명'); // 없을 경우 대체 텍스트
  //   }
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userId = localStorage.getItem("id");
        const response = await fetch(
          `http://localhost:8080/api/chatroom/summary/list?userId=${userId}`
        );
        const data = await response.json();
        setChatData(data);
      } catch (error) {
        console.error("채팅방 목록 불러오기 실패", error);
      }
    };

    fetchChatRooms();
  }, []);

  const handleFabClick = () => {
    navigate("/write");
  };

  return (
    <>
      <Header />
      <div className="chat-list-container">
        <div className="chat-list">
          {chatData.length === 0 ? (
            <p>채팅방이 없습니다.</p>
          ) : (
            chatData.map((chat) => (
              <div
                key={chat.chatRoomId}
                className="chat-item"
                onClick={() => navigate(`/chatting/${chat.chatRoomId}`)}
              >
                <div className="chat-profile">
                  <img
                    src={chat.profileImage || "default_profile_image_path"}
                    alt={chat.otherUserName}
                  />
                </div>
                <div className="chat-details">
                  <div className="chat-header">
                    <span className="chat-name">{chat.otherUserName}</span>
                  </div>
                  <div className="chat-body">
                    <span className="chat-message">{chat.lastMessage}</span>
                    <span className="chat-time">
                      {chat.lastMessageTime
                        ? new Date(chat.lastMessageTime).toLocaleString()
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <FloatingActionButton onClick={handleFabClick} />
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
};

export default ChatList;
