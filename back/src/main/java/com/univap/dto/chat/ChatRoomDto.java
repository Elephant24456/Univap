package com.univap.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomDto {
    private String id;
    private Long lastChatMsgId;
    private LocalDateTime lastChatMsgTime;
}
