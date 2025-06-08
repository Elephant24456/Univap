USE capstone_db;

#1번(05.24)
ALTER TABLE user
MODIFY profile_img VARCHAR(255) NOT NULL DEFAULT '';

#2번(05.25)
ALTER TABLE user
MODIFY id INT NOT NULL;

#3번(06.07)
-- 1️⃣ 외래키 제약조건 삭제 (post_ibfk_1 이름 확인!)
ALTER TABLE post DROP FOREIGN KEY post_ibfk_1;

-- 2️⃣ user.id 컬럼 변경
ALTER TABLE user MODIFY COLUMN id BIGINT NOT NULL AUTO_INCREMENT;

-- 3️⃣ post.user_id 컬럼 변경
ALTER TABLE post MODIFY COLUMN user_id BIGINT NOT NULL;

-- 4️⃣ 외래키 다시 추가
ALTER TABLE post
ADD CONSTRAINT post_ibfk_1 FOREIGN KEY (user_id) REFERENCES user(id);




-- chat_message 테이블 sender 컬럼 변경

ALTER TABLE chat_message
    ADD COLUMN sender_id BIGINT NOT NULL;

ALTER TABLE chat_message
    ADD CONSTRAINT FK_chat_message_sender
        FOREIGN KEY (sender_id)
            REFERENCES user(id);


ALTER TABLE chat_message
    ADD CONSTRAINT FK_chat_message_sender_user
        FOREIGN KEY (sender_id) REFERENCES user(id);

-- 6월 8일
ALTER TABLE post DROP COLUMN nickname;