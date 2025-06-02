SHOW DATABASES; #db 목록 조회

USE capstone_db; #capstone_db 사용

SELECT * FROM user; #유저 목록 조회

DELETE FROM user WHERE id = 1; #특정 유저 삭제

ALTER TABLE user AUTO_INCREMENT = 1; #AUTO_INCREMENT 초기화

SELECT * FROM user
WHERE email = 'test@test.com' AND password = '12345678';

select * from user
where email = 'haerin@newjeans.com' and password = '12345678';


UPDATE user #비밀번호 변경
SET password = '12345678'
WHERE id = 4;

commit;