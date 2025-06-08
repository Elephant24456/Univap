import React from "react";
import Chat from "../components/Chat";

const Chatting = () => {
  return <Chat />;
};

export default Chatting;


/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { chatRoomId } = useParams();  // URL에서 chatRoomId 가져오기
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/chatroom/${chatRoomId}/messages`);
        if (!response.ok) throw new Error('메시지 불러오기 실패');
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (chatRoomId) {
      fetchMessages();
    }
  }, [chatRoomId]);

  return (
      <div>
        <h2>채팅방 ID: {chatRoomId}</h2>
        <div>
          {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.senderId}:</strong> {msg.content}
              </div>
          ))}
        </div>
      </div>
  );
};

export default Chat;

 */