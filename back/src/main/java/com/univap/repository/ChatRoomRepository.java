package com.univap.repository;

import com.univap.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    // ChatRoom의 PK가 String(id)이므로 JpaRepository<ChatRoom, String>
}
