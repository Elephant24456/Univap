package com.univap.model;

import java.time.LocalDateTime;

public record ChatMessage(
        String content,
        String sender,
        MessageType type,
        LocalDateTime timestamp
) {
    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }

    // JDK 21의 레코드 기능으로 간결한 데이터 클래스 정의
    public ChatMessage withTimestamp() {
        return new ChatMessage(content, sender, type, LocalDateTime.now());
    }
}