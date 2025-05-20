package com.univap.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.Data;

@Entity
@Getter
@Setter
@Data
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String nickname;

    private String univ;
}
