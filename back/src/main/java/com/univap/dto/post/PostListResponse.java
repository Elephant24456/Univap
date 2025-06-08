package com.univap.dto.post;

import com.univap.entity.Post;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
public class PostListResponse {
    private Long id;
    private String title;
    private String nickname;
    private String location;
    private LocalDate date;
    private LocalTime time;
    private LocalDateTime postTime;
    private String content;

    public static PostListResponse fromEntity(Post post){
        PostListResponse dto = new PostListResponse();
        dto.id = post.getId();
        dto.title = post.getTitle();
        dto.nickname = post.getUser().getNickname();
        dto.location = post.getLocation();
        dto.date = post.getDate();
        dto.time = post.getTime();
        dto.postTime = post.getPostTime();
        dto.content = post.getContent();
        return dto;
    }
}
