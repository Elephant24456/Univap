import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const MessageType = {
  CHAT: "CHAT",
  JOIN: "JOIN",
  LEAVE: "LEAVE",
};

const websocketUrl = "http://localhost:8080/ws";

class WebSocketService {
  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(websocketUrl),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.messageCallbacks = new Set();
    this.client.onConnect = this.onConnect.bind(this);
    this.client.onStompError = this.onStompError.bind(this);
    this.chatRoomId = null;
    this.username = null;
  }

  disconnect() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
    }
  }

  subscribeToMessages(chatRoomId, callback) {
    this.chatRoomId = chatRoomId;

    const subscription = this.client.subscribe(
      `/topic/chatroom/${chatRoomId}`,
      (message) => {
        console.log("✅ STOMP 메시지 수신됨:", message); // 여기도 로그 추가
        try {
          const chatMessage = JSON.parse(message.body);
          this.messageCallbacks.forEach((cb) => cb(chatMessage));
        } catch (e) {
          console.error("Error parsing message", e);
        }
      }
    );

    this.messageCallbacks.add(callback);

    return () => {
      subscription.unsubscribe();
      this.messageCallbacks.delete(callback);
    };
  }

  sendMessage(chatRoomId, chatMessage) {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: "/app/chat.sendMessage", // 서버 @MessageMapping 경로
        body: JSON.stringify(chatMessage),
      });
    }
  }

  joinChat(chatRoomId, username) {
    if (!this.client || !this.client.connected) {
      console.error("WebSocket is not connected");
      return;
    }

    const message = {
      sender: username,
      content: `${username} joined the chat`,
      type: MessageType.JOIN,
      chatRoomId: chatRoomId, // 꼭 포함되어야 서버가 대상 룸을 알 수 있음
    };

    this.client.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(message),
    });
  }

  connect(username, onConnected) {
    if (!this.client) return;
    this.username = username;

    // ✅ 연결된 후 실행할 콜백 저장
    this.onConnected = onConnected;
    this.client.activate();
  }

  onConnect() {
    console.log("Connected to WebSocket");

    if (typeof this.onConnected === "function") {
      this.onConnected(); // ✅ 연결되었을 때 콜백 실행
    }
  }

  onStompError(frame) {
    console.error("STOMP error", frame);
  }
}

export const webSocketService = new WebSocketService();
export default webSocketService;
