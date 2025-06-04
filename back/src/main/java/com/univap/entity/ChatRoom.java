package com.univap.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@Table(name = "ChatRoom")
@DynamicUpdate
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@EntityListeners(value = {AuditingEntityListener.class})
public class ChatRoom {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id")
    private String id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "lastChatMsgId")
    private ChatMessage lastChatMsg;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "ChatRoom_Members",
            joinColumns = @JoinColumn(name = "chatRoomId"),
            inverseJoinColumns = @JoinColumn(name = "userId"))
    private Set<User> chatRoomMembers = new HashSet<>();

    @Column(name = "createdAt", updatable = false)
    private LocalDateTime createdAt;

    public static ChatRoom create() {
        ChatRoom room = new ChatRoom();
        room.setId(UUID.randomUUID().toString());
        return room;
    }

    public void addMembers(User roomMaker, User guest) {
        this.chatRoomMembers.add(roomMaker);
        this.chatRoomMembers.add(guest);
    }
}