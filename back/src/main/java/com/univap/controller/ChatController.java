package com.univap.controller;

import com.univap.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Objects;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        // JDK 21 가상 스레드 활용 가능
//        Thread.ofVirtual().name("chat-process-" + System.currentTimeMillis()).start(() -> {
//            System.out.println("Processing message from " + chatMessage.sender() + " in virtual thread");
//            // 메시지 처리 로직 (예: 로깅, 검증 등)
//        });

        return chatMessage.withTimestamp();
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // 웹소켓 세션에 사용자 이름 추가
        Objects.requireNonNull(Objects.requireNonNull(headerAccessor.getSessionAttributes())).put("username", chatMessage.sender());
        return chatMessage.withTimestamp();
    }
}