package com.univap.dto.post;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class PostUpdateRequest {
    private String title;
    private String content;
    private String location;
    private LocalDate date;
    private LocalTime time;
    private Long userId;
}
