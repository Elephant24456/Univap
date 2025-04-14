// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '../components/Button';
// import InputField from '../components/InputField';
// import BottomNavBar from '../components/BottomNavBar';
import React from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import "./ChatList.css"; // CSS 파일 import

const ChatList = () => {
  const chatData = [
    {
      id: 1,
      name: "홍길동",
      message: "수군수군수군",
      time: "오전 4:43",
      date: "2025/03/31, 12:00",
    },
  ];

  return (
    <>
      <Header />
      <div className="chat-list-container">
        <div className="chat-list">
          {chatData.map((chat) => (
            <div key={chat.id} className="chat-item">
              <div className="chat-profile">
                <img src="path_to_placeholder_image" alt={`${chat.name}`} />
              </div>
              <div className="chat-details">
                <div className="chat-header">
                  <span className="chat-name">{chat.name}</span>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <div className="chat-message">{chat.message}</div>
                <div className="chat-date">{chat.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default ChatList;
