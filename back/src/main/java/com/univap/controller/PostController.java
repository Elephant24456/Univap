package com.univap.controller;

import com.univap.dto.PostRequest;
import com.univap.entity.Post;
import com.univap.entity.User;
import com.univap.repository.PostRepository;
import com.univap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/post")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    public PostController(PostRepository postRepository, UserRepository userRepository){
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/write")
    public ResponseEntity<?> write(@RequestBody PostRequest request) {
        Optional<User> optionalUser = userRepository.findById(request.getUserId());

        if(optionalUser.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "해당 유저가 존재하지 않습니다."));
        }

        User user = optionalUser.get();

        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setDate(request.getDate());
        post.setTime(request.getTime());
        post.setLocation(request.getLocation());
        post.setContent(request.getContent());
        post.setUser(user);
        post.setNickname(user.getNickname());

        try{
            postRepository.save(post);
            return ResponseEntity.ok(Map.of("success", true, "message", "게시글 작성 완료"));
        }catch(Exception e){
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "서버 오류로 게시글 작성 실패"));
        }
    }
}
