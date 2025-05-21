import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import Button from '../components/Button';
import profileGray from '../assets/profile-gray.png';
import ProfileModal from '../components/ProfileModal';
import './MyPage.css';
import '../index.css';

const dummyPosts = [
  {
    id: 1,
    author: '독수리',
    title: '청림 12시 구해요',
    content: '내용을 입력해주세요. 내용을 입력해주세요. 주세요. 내용은',
    time: 'Today • 23 min',
  },
];

const MyPage = () => {
  const [nickname, setNickname] = useState('');
  const [activeTab, setActiveTab] = useState('mypage');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 로그인한 사용자만 접근 가능하므로, nickname은 항상 존재한다고 가정
    const storedNickname = localStorage.getItem('nickname');

    // 혹시라도 토큰 없이 들어온 경우 방어용
    if (!storedNickname) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    setNickname(storedNickname);
  }, []);

  const myPosts = dummyPosts.filter((post) => post.author === nickname);

  return (
    <div className="page-layout mypage">
      <Header username={nickname} />

      <section className="profile">
        <div className="pic-name">
          <img src={profileGray} alt="아바타" className="avatar" />
          <h2 className="nickname">{nickname}</h2>
        </div>
        <Button
          label="프로필 편집"
          onClick={() => setIsModalOpen(true)}
          variant="primary"
        />
      </section>

      {isModalOpen && <ProfileModal onClose={() => setIsModalOpen(false)} />}

      <section className="my-posts">
        <h3>작성한 글</h3>
        {myPosts.map((post) => (
          <div key={post.id} className="post-item">
            <h4>{post.title}</h4>
            <p>{post.time}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </section>
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
// todo 모달창 더 수정하기

export default MyPage;
