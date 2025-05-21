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
  const [profileImage, setProfileImage] = useState(''); // ✅ 프로필 이미지 상태 추가
  const [activeTab, setActiveTab] = useState('mypage');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    const storedImage = localStorage.getItem('profileImage');

    if (!storedNickname) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    setNickname(storedNickname);
    if (storedImage) setProfileImage(storedImage); // ✅ 이미지 불러오기
  }, []);

  const handleNicknameChange = (newNickname) => {
    setNickname(newNickname);
    localStorage.setItem('nickname', newNickname);
  };

  const handleImageChange = (newImage) => {
    setProfileImage(newImage);
    localStorage.setItem('profileImage', newImage);
  };

  const myPosts = dummyPosts.filter((post) => post.author === nickname);

  return (
    <div className="page-layout mypage">
      <Header username={nickname} />

      <section className="profile">
        <div className="pic-name">
          <img
            src={profileImage || profileGray}
            alt="아바타"
            className="avatar"
          />
          <h2 className="nickname">{nickname}</h2>
        </div>
        <Button
          label="프로필 편집"
          onClick={() => setIsModalOpen(true)}
          variant="primary"
        />
      </section>

      {isModalOpen && (
        <ProfileModal
          onClose={() => setIsModalOpen(false)}
          onNicknameChange={handleNicknameChange}
          onImageChange={handleImageChange}
        />
      )}

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

export default MyPage;
