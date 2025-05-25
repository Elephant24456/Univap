package com.univap.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class PostRequest {
    private String title;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private String content;
    private Long userId;
}
