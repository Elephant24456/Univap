package com.univap.dto.chat;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatRoomSummaryDto {
    private String chatRoomId;
    private Long otherUserId;
    private String otherUserName;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private String profileImage;
}
