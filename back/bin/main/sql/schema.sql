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

<<<<<<< HEAD
CREATE TABLE ChatRoom (
                           id VARCHAR(36) PRIMARY KEY,  -- UUID 저장용
                           last_chat_msg_id BIGINT,
                           created_at DATETIME NOT NULL,
                           CONSTRAINT fk_last_chat_msg
                               FOREIGN KEY (last_chat_msg_id)
                                   REFERENCES chat_message(id)
                                   ON DELETE SET NULL
);

CREATE TABLE chat_message (
                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                              chat_room_id VARCHAR(36),
                              sender VARCHAR(100) NOT NULL,
                              content TEXT NOT NULL,
                              type ENUM('CHAT', 'JOIN', 'LEAVE') NOT NULL,
                              timestamp DATETIME NOT NULL,
                              CONSTRAINT fk_ChatRoom
                                  FOREIGN KEY (chat_room_id)
                                      REFERENCES ChatRoom(id)
                                      ON DELETE CASCADE
);
=======
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
>>>>>>> 5154724ee1b71a2aa456643d804bbfb97483239a
