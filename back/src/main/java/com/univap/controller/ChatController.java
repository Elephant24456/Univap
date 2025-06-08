package com.univap.controller;

import com.univap.entity.ChatRoom;
import com.univap.model.ChatMessageModel;
import com.univap.repository.ChatMessageRepository;
import com.univap.repository.ChatRoomRepository;
import com.univap.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final ChatService chatService;
    private final ChatRoomRepository chatRoomRepository;
/*
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/{chatRoomId}")
    public ChatMessageModel sendMessage(@Payload ChatMessageModel chatMessage) {

        String chatRoomId = chatMessage.chatRoomId();

        chatService.saveChatMessage(chatMessage, chatRoomId);


        return chatMessage.withTimestamp();
    }
 */
/*
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/chatroom/{chatRoomId}")
    public  addUser(@Payload ChatMessageModel chatMessage,
                                    SimpMessageHeaderAccessor headerAccessor) {
        // 웹소켓 세션에 사용자 이름 추가
        //Objects.requireNonNull(Objects.requireNonNull(headerAccessor.getSessionAttributes())).put("username", chatMessage.sender());
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", chatMessage.sender());
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("chatRoomId", chatMessage.chatRoomId());
        return chatMessage.withTimestamp();
    }
    */
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("chat.sendMessage")
    public void sendMessage(@Payload ChatMessageModel chatMessage){
        System.out.println("메시지 수신됨: " + chatMessage);
        String chatRoomId = chatMessage.chatRoomId();

        log.info("📩 서버에서 메시지 받음: {}", chatMessage);

        chatService.saveChatMessage(chatMessage, chatRoomId);

        log.info("📤 서버에서 클라이언트로 메시지 발행: /topic/chatroom/" + chatRoomId);
        messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoomId, chatMessage.withTimestamp());
    }




    @MessageMapping("chat.addUser")
    public void addUser(@Payload ChatMessageModel chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        log.info("👤 chat.addUser 도착: {}", chatMessage);
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", chatMessage.senderId());
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("chatRoomId", chatMessage.chatRoomId());
        messagingTemplate.convertAndSend("/topic/chatroom/" + chatMessage.chatRoomId(), chatMessage.withTimestamp());
    }


}