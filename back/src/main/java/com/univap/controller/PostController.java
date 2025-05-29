package com.univap.controller;

import com.univap.dto.post.*;
import com.univap.entity.Post;
import com.univap.entity.User;
import com.univap.repository.PostRepository;
import com.univap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.stream.Collectors;

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

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id){
        Optional<Post> optionalPost = postRepository.findById(id);

        if(optionalPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "Message", "게시글을 찾을 수 없습니다."));
        }
        Post post = optionalPost.get();

        PostViewResponse postViewResponse = new PostViewResponse(post);
        return ResponseEntity.ok(postViewResponse);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody PostUpdateRequest updateRequest) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if(optionalPost.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "해당 게시물을 찾을 수 없습니다."));
        }
        Optional<User> optionalUser = userRepository.findById(updateRequest.getUserId());
        if(optionalUser.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "해당 유저가 존재하지 않습니다."));
        }

        Post post = optionalPost.get();
        User user = optionalUser.get();

        if(!post.getUser().getId().equals(user.getId())){
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "작성자가 아닙니다."));
        }

        post.setTitle(updateRequest.getTitle());
        post.setContent(updateRequest.getContent());
        post.setLocation(updateRequest.getLocation());
        post.setDate(updateRequest.getDate());
        post.setTime(updateRequest.getTime());

        try{
            postRepository.save(post);
            return ResponseEntity.ok(Map.of("success", true, "message", "게시글 수정 완료"));
        }catch(Exception e){
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "서버 오류로 게시글 수정 실패"));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id, @RequestBody PostDeleteRequest deleteRequest) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if(optionalPost.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "해당 게시글이 존재하지 않습니다."));
        }

        Post post = optionalPost.get();

        if(!id.equals(post.getId())){
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "요청경로 불일치"));
        }

        Optional<User> optionalUser = userRepository.findById(deleteRequest.getUserId());
        if(optionalUser.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "해당 유저가 존재하지 않습니다."));
        }
        User user = optionalUser.get();

        if(!post.getUser().getId().equals(user.getId())){
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "작성자가 아닙니다."));
        }

        try{
            postRepository.delete(post);
            return ResponseEntity.ok(Map.of("success", true, "message", "게시글을 삭제하였습니다."));
        }catch(Exception e){
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "서버 오류로 인해 삭제할 수 없습니다."));
        }
    }


   @GetMapping("/list")
    public ResponseEntity<List<PostListResponse>> getAllPosts(){
        List<Post> postList = postRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        List<PostListResponse> postListResponses = postList.stream().map(PostListResponse::fromEntity).collect(Collectors.toList());
        return ResponseEntity.ok(postListResponses);
    }

    //마이페이지에서 보는 postList는 UserController에 있습니다!


}
