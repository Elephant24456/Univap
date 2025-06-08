package com.univap.service;


import com.univap.dto.chat.ChatMessageDto;
import com.univap.dto.chat.ChatRoomSummaryDto;
import com.univap.entity.ChatMessage;
import com.univap.entity.ChatRoom;
import com.univap.entity.User;
import com.univap.repository.ChatMessageRepository;
import com.univap.repository.ChatRoomRepository;
import com.univap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    public ChatRoom createChatRoom(User user1, User user2){
        ChatRoom chatRoom = ChatRoom.create();
        System.out.println("chat room created: " + chatRoom);
        chatRoom.setCreatedAt(LocalDateTime.now());
        System.out.println("chat room setCreateAt: " + chatRoom.getCreatedAt());
        chatRoom.addMembers(user1, user2);
        System.out.println("member id :" + user1.getId() + ", member id :" + user2.getId());
        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);

        System.out.println("saved chatRoom: " + savedChatRoom);

        return savedChatRoom;
    }

    public ChatRoom findById(String id){
        return chatRoomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ChatRoom not found: " + id));
    }

    @Transactional(readOnly = true)
    public List<ChatRoom> findChatRoomsByUser(Long userId) {
        return chatRoomRepository.findChatRoomsByUserId(userId);
    }

    public List<ChatMessageDto> findMessagesByChatRoomId(String chatRoomId) {
        ChatRoom chatRoom = findById(chatRoomId);
        List<ChatMessage> messages = chatMessageRepository.findByChatRoom(chatRoom);

        return messages.stream().map(msg -> ChatMessageDto.builder()
                .id(msg.getId())
                .content(msg.getContent())
                .senderId(msg.getSender().getId())
                .messageType(msg.getMessageType().name())  // Enum -> String 변환
                .timestamp(msg.getTimestamp())
                .chatRoomId(msg.getChatRoom().getId())
                .build()).toList();
    }

    @Transactional(readOnly = true)
    public List<ChatRoom> findChatRoomByUsers(Long user1Id, Long user2Id) {
        return chatRoomRepository.findChatRoomByUsers(user1Id, user2Id);
    }

    @Transactional(readOnly = true)
    public List<ChatRoomSummaryDto> getChatRoomList(Long userId) {
        List<ChatRoom> chatRooms = chatRoomRepository.findChatRoomsByUserId(userId);

        return chatRooms.stream().map(room -> {
            User otherUser = room.getChatRoomMembers().stream()
                    .filter(user -> !user.getId().equals(userId))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("상대 유저 없음"));

            ChatMessage lastMsg = room.getLastChatMsg();

            String base64 = "";
            try {
                Path imgPath = Paths.get(otherUser.getImage());
                byte[] bytes = Files.readAllBytes(imgPath);
                base64 = "data:image/png;base64," + Base64.getEncoder().encodeToString(bytes);
            }catch(Exception e) {
                base64 = "";
            }

            return ChatRoomSummaryDto.builder()
                    .chatRoomId(room.getId())
                    .otherUserId(otherUser.getId())
                    .otherUserName(otherUser.getNickname())
                    .lastMessage(lastMsg != null ? lastMsg.getContent() : "")
                    .lastMessageTime(lastMsg != null ? lastMsg.getTimestamp() : null)
                    .profileImage(base64)
                    .build();
        }).toList();
    }

    // ChatRoomService.java

    public ChatMessageDto sendMessage(String chatRoomId, ChatMessageDto messageDto) {
        ChatRoom chatRoom = findById(chatRoomId);

        // sender 찾기
        User sender = userRepository.findById(messageDto.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        // ChatMessage 엔티티 생성
        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .sender(sender)
                .content(messageDto.getContent())
                .messageType(ChatMessage.MessageType.valueOf(messageDto.getMessageType()))
                .timestamp(LocalDateTime.now())
                .build();

        // 저장
        ChatMessage savedMessage = chatMessageRepository.save(chatMessage);

        // ChatRoom의 lastChatMsg 갱신
        chatRoom.setLastChatMsg(savedMessage);
        chatRoomRepository.save(chatRoom);

        // 반환용 DTO 생성
        return ChatMessageDto.builder()
                .id(savedMessage.getId())
                .chatRoomId(chatRoomId)
                .senderId(sender.getId())
                .content(savedMessage.getContent())
                .messageType(savedMessage.getMessageType().name())
                .timestamp(savedMessage.getTimestamp())
                .build();
    }
}
