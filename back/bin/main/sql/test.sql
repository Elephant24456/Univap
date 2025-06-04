SHOW DATABASES; #db 목록 조회

USE capstone_db; #capstone_db 사용

<<<<<<< HEAD
=======
#user테이블 관련

>>>>>>> a860a818f639b0eb1993ff4cc32058f2561eb2f5
SELECT * FROM user; #유저 목록 조회

DELETE FROM user WHERE id = 1; #특정 유저 삭제

ALTER TABLE user AUTO_INCREMENT = 1; #AUTO_INCREMENT 초기화

SELECT * FROM user
WHERE email = 'test@test.com' AND password = '12345678';

select * from user
where email = 'haerin@newjeans.com' and password = '12345678';

<<<<<<< HEAD
commit;
=======

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
>>>>>>> a860a818f639b0eb1993ff4cc32058f2561eb2f5
