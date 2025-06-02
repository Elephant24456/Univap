package com.univap.dto.post;

import lombok.Getter;

@Getter
public class PostDeleteRequest {
    private Long postId;
    private Long userId;
}
