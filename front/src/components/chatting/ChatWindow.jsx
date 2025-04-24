import React, { useState } from "react";
import HeaderUserName from "./HeaderUserName";
import HeaderPostSummary from "./HeaderPostSummary";
import Message from "./Message";
import MessageInput from "./MessageInput";
import "./ChatWindow.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    setMessages([...messages, { text, isSender: true }]);
    // 예시: 수신 메시지 추가
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "답변 메시지", isSender: false },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-window">
      <HeaderUserName title="홍길동" />
      <HeaderPostSummary
        title="판매글 제목 예시"
        content="게시물 내용의 간략한 요약입니다. 채팅 전에 확인해주세요."
        time="만남 - 04/20, AM 10:30"
      />

      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} isSender={msg.isSender} />
        ))}
      </div>
      <div className="message-input-container">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
