import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // location 사용
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import "./ChatList.css";

const ChatList = () => {
  const [nickname, setNickname] = useState("");
  const [chatData, setChatData] = useState([]);
  const [activeTab, setActiveTab] = useState("chatlist");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 닉네임을 localStorage에서 불러오고 상태에 반영
  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    setNickname(storedNickname || "익명");
  }, [location]); // location이 바뀔 때마다 최신 닉네임 반영

  // ✅ 채팅방 목록 불러오기
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

  // ✅ 닉네임 변경 함수 예시 (다른 컴포넌트에서 불러와 호출 가능)
  const handleNicknameChange = (newNickname) => {
    localStorage.setItem("nickname", newNickname);
    setNickname(newNickname); // 상태도 업데이트
  };

  return (
    <>
      <Header username={nickname} />
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
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
};

export default ChatList;
