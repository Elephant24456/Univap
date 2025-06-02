package com.univap.repository;

import com.univap.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    //이메일+비밀번호 유저찾기 - 가입 확인용
    Optional<User> findByEmailAndPassword(String email, String password);
    //이메일로 유저찾기 - 중복확인용
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}


