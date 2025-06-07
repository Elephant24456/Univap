package com.univap.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.Data;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Data
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String nickname;
    private String univ;

    @Column(name = "profile_img")
    private String image;

    @ManyToMany(mappedBy = "chatRoomMembers")
    @ToString.Exclude
    private Set<ChatRoom> chatRooms = new HashSet<>();
}






