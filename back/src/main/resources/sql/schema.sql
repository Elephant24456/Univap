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

CREATE TABLE post( #post테이블 생성
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(50),
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    post_time DATETIME NOT NULL DEFAULT  CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);