package com.univap.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ChatMessageDto {
    private Long id;
    private String content;
    private Long senderId;
    private String chatRoomId;
    private String messageType;  // Enum이 아니라 String으로 안전하게
    private LocalDateTime timestamp;
}