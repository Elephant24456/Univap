import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import webSocketService from '../services/WebSocketService';
import '../components/Chat.css';
import { FaLocationArrow } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [connected, setConnected] = useState(false);

  const { chatRoomId } = useParams();

  // 로그인 유저 정보 (예: localStorage에서 가져오기)
  const user = JSON.parse(localStorage.getItem('user'));
  const username =
    localStorage.getItem('nickname') || user?.nickname || '알 수 없음';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  useEffect(() => {
    let unsubscribe;

    webSocketService.connect(username, () => {
      setConnected(true); // 연결 완료 시 true로 변경
      unsubscribe = webSocketService.subscribeToMessages(
        chatRoomId,
        (message) => {
          setMessages((prev) => [...prev, message]);
        }
      );

      webSocketService.joinChat(chatRoomId, username);
    });

    return () => {
      if (unsubscribe) unsubscribe();
      webSocketService.disconnect();
      setConnected(false);
    };
  }, [chatRoomId, username]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!connected) {
      alert('WebSocket이 아직 연결되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const chatMessage = {
      chatRoomId,
      content: message,
      senderId: user.id,
      type: 'CHAT',
    };

    webSocketService.sendMessage(chatRoomId, chatMessage);
    setMessage('');
  };

  const getMessageClass = (msg) => {
    if (msg.type === 'JOIN' || msg.type === 'LEAVE') {
      return 'event-message';
    }

    // senderId가 존재하고, 유저 ID가 같으면 내 메시지로 간주
    return msg.senderId === user.id ? 'my-message' : 'other-message';
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">
          <div className="chat-header-row">
            <IoArrowBack
              className="back-icon"
              size={24}
              onClick={() => navigate('/home')}
            />
            <p className="chat-username">접속 닉네임: {username}</p>
          </div>
        </div>
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${getMessageClass(msg)}`}>
              {msg.type === 'CHAT' && (
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
          <button type="submit">
            <FaLocationArrow />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
