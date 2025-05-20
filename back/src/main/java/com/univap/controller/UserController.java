package com.univap.controller;

import com.univap.dto.LoginRequest;
import com.univap.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import com.univap.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request){
        String email = request.getEmail();
        String password = request.getPassword();

        return userRepository.findByEmailAndPassword(email, password)
                .map(user -> (Map<String, Object>) (Map) Map.of(
                "success", true,
                "message", "로그인 성공",
                "nickname", user.getNickname()
        )).orElse((Map<String, Object>) (Map) Map.of(
                "success", false,
                "message", "이메일 또는 비밀번호가 틀렸습니다."
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null || user.getNickname() == null || user.getUniv() == null) {
            return ResponseEntity.badRequest().body("필수 항목이 누락되었습니다.");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 존재하는 이메일입니다.");
        }

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("success", true, "message", "회원가입 성공"));
    }
}