package com.univap.model;

import java.time.LocalDateTime;

public record ChatMessageModel(
        String chatRoomId,
        String content,
        Long senderId,
        MessageType type,
        LocalDateTime timestamp
) {
    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }

    // JDK 21의 레코드 기능으로 간결한 데이터 클래스 정의
    public ChatMessageModel withTimestamp() {
        return new ChatMessageModel(chatRoomId, content, senderId, type, LocalDateTime.now());
    }
}