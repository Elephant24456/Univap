import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const MessageType = {
  CHAT: 'CHAT',
  JOIN: 'JOIN',
  LEAVE: 'LEAVE',
};

const websocketUrl = 'http://localhost:8080/ws';

class WebSocketService {
  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(websocketUrl), // 직접 URL 넣기
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.messageCallbacks = new Set();

    this.client.onConnect = this.onConnect.bind(this);
    this.client.onStompError = this.onStompError.bind(this);
  }

  connect(username) {
    if (!this.client) return;

    this.client.activate();
    localStorage.setItem('chat_username', username);
  }

  disconnect() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
    }
  }

  subscribeToMessages(callback) {
    this.messageCallbacks.add(callback);

    return () => {
      this.messageCallbacks.delete(callback);
    };
  }

  sendMessage(message) {
    if (!this.client || !this.client.connected) {
      console.error('WebSocket is not connected');
      return;
    }

    this.client.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(message),
    });
  }

  joinChat(username) {
    if (!this.client || !this.client.connected) {
      console.error('WebSocket is not connected');
      return;
    }

    const message = {
      sender: username,
      content: `${username} joined the chat`,
      type: MessageType.JOIN,
    };

    this.client.publish({
      destination: '/app/chat.addUser',
      body: JSON.stringify(message),
    });
  }

  onConnect() {
    console.log('Connected to WebSocket');

    const username = localStorage.getItem('chat_username');

    if (username) {
      this.client.subscribe('/topic/public', (message) => {
        try {
          const chatMessage = JSON.parse(message.body);
          this.messageCallbacks.forEach((callback) => callback(chatMessage));
        } catch (e) {
          console.error('Error parsing message', e);
        }
      });

      this.joinChat(username);
    }
  }

  onStompError(frame) {
    console.error('STOMP error', frame);
  }
}

export const webSocketService = new WebSocketService();
export default webSocketService;
