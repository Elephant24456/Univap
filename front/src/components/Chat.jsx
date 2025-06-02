import React, { useState, useEffect, useRef } from "react";
import webSocketService from "../services/WebSocketService";
import "../components/Chat.css";

const generateAnonymousUsername = () => {
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `익명${randomNum}`;
};

const Chat = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const generatedUsername = generateAnonymousUsername();
    setUsername(generatedUsername);
    webSocketService.connect(generatedUsername);

    const unsubscribe = webSocketService.subscribeToMessages((message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      unsubscribe();
      webSocketService.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const chatMessage = {
      sender: username,
      content: message,
      type: "CHAT",
    };

    webSocketService.sendMessage(chatMessage);
    setMessage("");
  };

  const getMessageClass = (msg) => {
    if (msg.type === "JOIN" || msg.type === "LEAVE") {
      return "event-message";
    }
    return msg.sender === username ? "my-message" : "other-message";
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">
          <h2>WebSocket Chat</h2>
          <p>접속 닉네임: {username}</p>
        </div>
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${getMessageClass(msg)}`}>
              {msg.type === "CHAT" && (
                <div className="message-sender">{msg.sender}</div>
              )}
              <div className="message-content">{msg.content}</div>
              {msg.timestamp && (
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">보내기</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
