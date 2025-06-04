package com.univap.repository;

import com.univap.entity.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAll(Sort sort); //내림차순 정렬

    List<Post> findByUserId(Long userId, Sort sort); //해당 유저아이디로 검색(마이페이지용)


}
