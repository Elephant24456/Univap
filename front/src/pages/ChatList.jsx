import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import './ChatList.css';

const ChatList = () => {
  const [chatData, setChatData] = useState([]);
  const [activeTab, setActiveTab] = useState('chatlist');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userId = localStorage.getItem('id');
        const response = await fetch(`http://localhost:8080/api/chatroom/summary/list?userId=${userId}`);
        const data = await response.json();
        setChatData(data);
      } catch (error) {
        console.error('채팅방 목록 불러오기 실패', error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
      <>
        <Header />
        <div className="chat-list-container">
          <div className="chat-list">
            {chatData.length === 0 ? (
                <p>채팅방이 없습니다.</p>
            ) : (
                chatData.map(chat => (
                    <div
                        key={chat.chatRoomId}
                        className="chat-item"
                        onClick={() => navigate(`/chatting/${chat.chatRoomId}`)}
                    >
                      <div className="chat-profile">
                        <img src={chat.profileImage || 'default_profile_image_path'} alt={chat.otherUserName} />
                      </div>
                      <div className="chat-details">
                        <div className="chat-header">
                          <span className="chat-name">{chat.otherUserName}</span>
                          <span className="chat-time">
                      {chat.lastMessageTime ? new Date(chat.lastMessageTime).toLocaleString() : ''}
                    </span>
                        </div>
                        <div className="chat-message">{chat.lastMessage}</div>
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