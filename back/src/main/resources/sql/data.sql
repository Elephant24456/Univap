USE capstone_db;

INSERT INTO user (email, password, univ, profile_img, nickname)
VALUES(
       'haerin@newjeans.com',
       '12345678',
       '뉴진스대학교',
       '/images/test.png',
       '해린냥이'
);

INSERT INTO post (title, date, time, location, content, user_id, nickname)
VALUES(
       '7시에 주먹고기가실분',
       '2025-05-25',
       '19:00:00',
       '주먹고기',
       '진짜 가서 밥만 먹죠, 우리가 할말은 주문뿐.',
       '2',
       '고슴도치'
);