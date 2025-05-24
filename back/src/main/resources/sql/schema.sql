CREATE DATABASE capstone_db CHARACTER SET utf8mb4; #db 생성

USE capstone_db; #db 사용

CREATE TABLE user( #user테이블 생성
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    univ VARCHAR(50) NOT NULL,
    profile_img VARCHAR(255) NOT NULL DEFAULT '',
    nickname VARCHAR(30) NOT NULL
);