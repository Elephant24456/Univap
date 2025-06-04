package com.univap.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileImageRequest {
    private String email;
    private String profileImage;
}