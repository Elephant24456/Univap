package com.univap.controller;


import com.univap.dto.chat.ChatMessageDto;
import com.univap.dto.chat.ChatRoomDto;
import com.univap.dto.chat.ChatRoomSummaryDto;
import com.univap.entity.ChatMessage;
import com.univap.entity.ChatRoom;
import com.univap.entity.User;
import com.univap.repository.UserRepository;
import com.univap.service.ChatRoomService;
import com.univap.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/chatroom")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatService chatService;
    private final UserRepository userRepository;
    private final SimpMessageSendingOperations messagingTemplate;

    @PostMapping("/create")
    public ChatRoomDto createChatRoom(@RequestParam Long user1Id, @RequestParam Long user2Id) {

        User user1 = userRepository.findById(user1Id)
                .orElseThrow(() -> new RuntimeException("User not found: " + user1Id));
        System.out.println("user1 activate");
        User user2 = userRepository.findById(user2Id)
                .orElseThrow(() -> new RuntimeException("User not found: " + user2Id));
        System.out.println("user2 activate");;
        ChatRoom chatRoom = chatRoomService.createChatRoom(user1, user2);

        return ChatRoomDto.builder()
                .id(chatRoom.getId())
                .lastChatMsgId(chatRoom.getLastChatMsg() != null ? chatRoom.getLastChatMsg().getId() : null)
                .lastChatMsgTime(chatRoom.getLastChatMsg() != null ? chatRoom.getLastChatMsg().getTimestamp() : null)
                .build();
    }

    @GetMapping("/list")
    public List<ChatRoomDto> listChatRooms(@RequestParam Long userId) {
        List<ChatRoom> chatRooms = chatRoomService.findChatRoomsByUser(userId);

        return chatRooms.stream()
                .map(chatRoom -> ChatRoomDto.builder()
                        .id(chatRoom.getId())
                        .lastChatMsgId(chatRoom.getLastChatMsg() != null ? chatRoom.getLastChatMsg().getId() : null)
                        .lastChatMsgTime(chatRoom.getLastChatMsg() != null ? chatRoom.getLastChatMsg().getTimestamp() : null)
                        .build())
                .toList();
    }

    @GetMapping("/{chatRoomId}/messages")
    public List<ChatMessageDto> getChatMessages(@PathVariable String chatRoomId){
        return chatRoomService.findMessagesByChatRoomId(chatRoomId);
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> checkChatRoom(@RequestParam Long user1Id, @RequestParam Long user2Id) {
        List<ChatRoom> rooms = chatRoomService.findChatRoomByUsers(user1Id, user2Id);

        Map<String, Object> response = new HashMap<>();

        if (rooms.isEmpty()){
            response.put("exists", false);
            response.put("chatRoomId", null);
        }
        else{
            ChatRoom chatRoom = rooms.get(0);
            response.put("exists", true);
            response.put("chatRoomId", chatRoom.getId());
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/summary/list")
    public List<ChatRoomSummaryDto> getChatRoomList(@RequestParam Long userId) {
        return chatRoomService.getChatRoomList(userId);
    }

    @PostMapping("/{chatRoomId}/send")
    public ChatMessageDto sendMessage(@PathVariable String chatRoomId, @RequestBody ChatMessageDto chatMessageDto) {
        ChatMessageDto savedMessage = chatRoomService.sendMessage(chatRoomId, chatMessageDto);

        messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoomId, savedMessage);
        return savedMessage;

    }
}
