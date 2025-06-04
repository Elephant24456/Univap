package com.univap.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NicknameUpdateRequest {
    private String email;
    private String nickname;
}
