package com.univap.dto.post;

import com.univap.entity.Post;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
public class PostViewResponse {
    private Long userId; // 작성자 id 추가
    private String title;
    private String content;
    private String nickname;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private LocalDateTime postTime;

    public PostViewResponse(Post post){
        this.userId = post.getUser().getId(); // 추가된 부분
        this.title = post.getTitle();
        this.content = post.getContent();
        this.nickname = post.getUser().getNickname();
        this.date = post.getDate();
        this.time = post.getTime();
        this.location = post.getLocation();
        this.postTime = post.getPostTime();
    }
}
