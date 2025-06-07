package com.univap.service;

import com.univap.entity.ChatRoom;
import com.univap.entity.ChatMessage;
import com.univap.entity.User;
import com.univap.repository.ChatMessageRepository;
import com.univap.repository.ChatRoomRepository;
import com.univap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.univap.model.ChatMessageModel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService{
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public void saveChatMessage(ChatMessageModel payload, String chatRoomId){
        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findById(chatRoomId);
        if(optionalChatRoom.isEmpty()){
            log.warn("ChatRoom not found. ID: {}", chatRoomId);
            return;
        }

        ChatRoom chatRoom = optionalChatRoom.get();

        User sender = userRepository.findById(payload.senderId())
                .orElseThrow(() -> new RuntimeException("Sender not found." + payload.senderId()));

        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .content(payload.content())
                .sender(sender)
                .messageType(ChatMessage.MessageType.valueOf(payload.type().name()))
                .timestamp(LocalDateTime.now())
                .build();

        ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);

        chatRoom.setLastChatMsg(savedChatMessage);
        chatRoomRepository.save(chatRoom);

        log.info("Chat message saved. ID: {}, Room: {}", savedChatMessage.getId(), chatRoomId);
    }

    // ChatService.java

    public List<ChatMessage> getMessagesByChatRoomId(String chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("ChatRoom not found: " + chatRoomId));

        return chatMessageRepository.findByChatRoom(chatRoom);
    }
}