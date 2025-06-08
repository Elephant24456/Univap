SHOW DATABASES; #db 목록 조회

USE capstone_db; #capstone_db 사용

#user테이블 관련

SELECT * FROM user; #유저 목록 조회

DELETE FROM user WHERE id = 5; #특정 유저 삭제

ALTER TABLE user AUTO_INCREMENT = 5; #AUTO_INCREMENT 초기화

SELECT * FROM user
WHERE email = 'test@test.com' AND password = '12345678';

select * from user
where email = 'haerin@newjeans.com' and password = '12345678';


UPDATE user #비밀번호 변경
SET password = '12345678'
WHERE id = 4;

commit;

UPDATE user #profile_img가 null일 경우 빈문자열로 바꿔주는 코드
SET profile_img = ''
WHERE id = 4;

#포스트 테이블 관련

#포스트 테이블 조회
SELECT * FROM post;

#포스트 삭제
DELETE FROM post WHERE id = 1;


#auto_increment초기화
ALTER TABLE post AUTO_INCREMENT = 1;


#채팅 관련
SELECT * FROM chat_message
WHERE chat_room_id = '44f51431-f031-4916-b261-fb47bdf07089';

SHOW TABLES;

SELECT * FROM chat_message;

SELECT * FROM chat_room;

DESCRIBE user;
DESCRIBE chat_room_members;
DESCRIBE chat_message;
SELECT * FROM chat_room_members;

SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE chat_message;
TRUNCATE TABLE chat_room_members;
TRUNCATE TABLE chat_room;
SET FOREIGN_KEY_CHECKS=1;


UPDATE user SET password = '$2a$10$ldXz/aT57qHbGdEhHehes.JdxKsM5iRd.kILOarK0twSd7TsJwh.q' WHERE id = 4;

DELETE FROM chat_room_members WHERE chat_room_id = '44f0ba5f-b899-48a1-8d1c-a7ea52f89889';

DELETE FROM chat_room_members;
SELECT * FROM chat_room_members;

DELETE FROM chat_room;
SELECT * FROM chat_room;

ALTER TABLE chat_room
DROP FOREIGN KEY FKo518ppw4cro5jefwqu7cvmuyf;


DESC chat_room;

DELETE FROM chat_message;
SELECT * FROM chat_message;


ALTER TABLE chat_room
ADD CONSTRAINT FKo518ppw4cro5jefwqu7cvmuyf
FOREIGN KEY (last_chat_msg_id) REFERENCES chat_message(id);