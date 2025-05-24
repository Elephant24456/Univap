package com.univap.controller;

import com.univap.dto.LoginRequest;
import com.univap.dto.NicknameUpdateRequest;
import com.univap.dto.ProfileImageRequest;
import com.univap.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import com.univap.entity.User;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

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

    @PutMapping("/me")
    public ResponseEntity<?> updateNickname(@RequestBody NicknameUpdateRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setNickname(request.getNickname());
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("success", true, "message", "닉네임 변경 성공"));
        }
        else{
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "오류 발생"));
        }
    }

    @PutMapping("/me/image")
    public ResponseEntity<?> updateProfileImage(@RequestBody ProfileImageRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if(optionalUser.isPresent()){
            User user = optionalUser.get();

            try{
                String image = request.getProfileImage();
                if(image.contains(",")){
                    image = image.split(",")[1];
                }
                byte[] imageBytes = Base64.getDecoder().decode(image);

                String fileName = UUID.randomUUID().toString() + ".png";
                Path path = Paths.get("uploads/profile/images/" + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, imageBytes);

                if(!user.getImage().isBlank()){
                    try{
                        Path oldImagePath = Paths.get(user.getImage());
                        Files.delete(oldImagePath);
                    }catch (NoSuchFileException e){
                        System.out.println("저장된 이미지가 없음" + e.getMessage());
                    }catch (IOException e){
                        System.out.println("이미지 삭제 오류" + e.getMessage());
                    }
                }

                user.setImage(path.toString());
                userRepository.save(user);

                return ResponseEntity.ok(Map.of("success", true, "message", "이미지 저장 완료"));
            }catch(IOException e){
                return ResponseEntity.status(500).body(Map.of("success", false, "message", "파일 저장 실패"));
            }
        }else{
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "사용자 없음"));
        }
    }

    @GetMapping("/me/image/view")
    public ResponseEntity<?> viewProfileImage(@RequestParam String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.getImage().isBlank()){
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "이미지가 설정 되지 않음", "profileImage","기본 이미지"));
            }
            Path path = Paths.get(user.getImage());

            try {
                byte[] bytes = Files.readAllBytes(path);
                String base64 = "data:image/png;base64," + Base64.getEncoder().encodeToString(bytes);
                return ResponseEntity.ok(Map.of("success", true, "message", "이미지 로드 성공", "profileImage", base64));
            } catch (IOException e) {
                return ResponseEntity.status(500).body(Map.of("success", false, "message", "이미지 로드 실패", "profileImage", "hedgehog"));
            }
        }
        return ResponseEntity.badRequest().body(Map.of("success", false, "message", "존재하지 않는 유저", "profileImage", "nothing"));
    }
}