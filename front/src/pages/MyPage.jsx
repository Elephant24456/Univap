import React, { useState } from 'react';
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
  const username = '독수리';
  const [activeTab, setActiveTab] = useState('mypage');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myPosts = dummyPosts.filter((post) => post.author === username);

  return (
    <div className="page-layout mypage">
      <Header username="독수리" />
      <section className="profile">
        <div className="pic-name">
          <img src={profileGray} alt="아바타" className="avatar" />
          <h2 className="nickname">{username}</h2>
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
