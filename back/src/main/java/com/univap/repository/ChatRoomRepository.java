package com.univap.repository;

import com.univap.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    // ChatRoom의 PK가 String(id)이므로 JpaRepository<ChatRoom, String>
    @Query("SELECT c FROM ChatRoom c JOIN c.chatRoomMembers m WHERE m.id = :userId")
    List<ChatRoom> findChatRoomsByUserId(@Param("userId") Long userId);

    //@Query("SELECT c FROM ChatRoom c JOIN c.chatRoomMembers m1 JOIN c.chatRoomMembers m2 WHERE m1.id = :user1Id AND m2.id = :user2Id")
    //Optional<ChatRoom> findChatRoomByUsers(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);

    @Query("""
    SELECT c FROM ChatRoom c
    JOIN c.chatRoomMembers m
    WHERE m.id IN (:user1Id, :user2Id)
    GROUP BY c.id
    HAVING COUNT(DISTINCT m.id) = 2
    """)
    List<ChatRoom> findChatRoomByUsers(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);
}
