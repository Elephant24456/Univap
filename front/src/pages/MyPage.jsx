import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import Button from '../components/Button';
import profileGray from '../assets/profile-gray.png';
import ProfileModal from '../components/ProfileModal';
import EditPostModal from '../components/EditPostModal';
import { IoIosArrowForward, IoMdTrash } from 'react-icons/io';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import './MyPage.css';
import '../index.css';

const MyPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [activeTab, setActiveTab] = useState('mypage');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    const storedImage = localStorage.getItem('profileImage');
    const storedId = localStorage.getItem('id');

    if (!storedNickname || !storedId) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    setNickname(storedNickname);
    if (storedImage) setProfileImage(storedImage);

    fetch(`${API_URL}/api/user/${storedId}/posts`)
      .then((res) => res.json())
      .then((posts) => {
        setMyPosts(posts);
        console.log(posts);
      });
  }, []);

  // 글 수정 저장
  const handlePostUpdate = async (editedPost) => {
    try {
      const res = await fetch(`${API_URL}/api/post/update/${editedPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedPost.title,
          content: editedPost.content,
          location: editedPost.location,
          date: editedPost.date,
          time: editedPost.time,
          userId: localStorage.getItem('id'),
        }),
      });
      const result = await res.json();
      if (result.success) {
        setMyPosts(
          myPosts.map((post) => (post.id === editedPost.id ? editedPost : post))
        );
        setEditingPost(null);
        toast.success('글이 수정되었습니다!');
      } else {
        toast.error(result.message || '수정 실패');
      }
    } catch (err) {
      toast.error('수정 중 오류 발생');
    }
  };

  // 글 수정 취소
  const handleEditCancel = () => {
    setEditingPost(null);
    toast.success('수정이 취소되었습니다.');
  };

  // 글 삭제
  const handlePostDelete = async (postId) => {
    const result = await Swal.fire({
      title: '정말 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fa6e34',
      cancelButtonColor: '#b2b2b2',
      confirmButtonText: '네, 삭제할게요',
      cancelButtonText: '취소',
      width: 250,
      customClass: {
        popup: 'swal-small-popup',
        title: 'swal-small-title',
        content: 'swal-small-content',
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/api/post/delete/${postId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: localStorage.getItem('id') }),
        });
        const data = await res.json();

        if (data.success) {
          setMyPosts(myPosts.filter((post) => post.id !== postId));
          toast.success('글이 삭제되었습니다!');
        } else {
          toast.error(data.message || '삭제 실패');
        }
      } catch (err) {
        toast.error('서버 오류가 발생했습니다.');
      }
    } else {
      // 취소 버튼 눌렀을 때
      toast('삭제가 취소되었습니다.', { icon: '❎' });
    }
  };

  // 닉네임 변경
  const handleNicknameChange = async (newNickname) => {
    const email = localStorage.getItem('email');
    setNickname(newNickname);
    localStorage.setItem('nickname', newNickname);

    try {
      const res = await fetch(`${API_URL}/api/user/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nickname: newNickname }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('프로필이 저장되었습니다!');
      } else {
        toast.error(result.message || '프로필 저장 실패');
      }
    } catch (err) {
      toast.error('프로필 저장 실패');
    }
  };

  // 프로필 이미지 변경
  const handleImageChange = async (newImage) => {
    const email = localStorage.getItem('email');
    setProfileImage(newImage);
    localStorage.setItem('profileImage', newImage);

    try {
      const res = await fetch(`${API_URL}/api/user/me/image`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, profileImage: newImage }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('프로필 사진이 변경되었습니다!');
      } else {
        toast.error(result.message || '프로필 사진 변경 실패');
      }
    } catch (err) {
      toast.error('프로필 사진 변경 실패');
    }
  };

  // 프로필 편집 닫기 (취소)
  const handleProfileEditCancel = () => {
    setIsModalOpen(false);
  };

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
          onClick={() => {
            setIsModalOpen(true);
          }}
          variant="primary"
        />
      </section>

      {isModalOpen && (
        <ProfileModal
          onClose={handleProfileEditCancel} // 취소 시 토스트
          onNicknameChange={handleNicknameChange}
          onImageChange={handleImageChange}
        />
      )}

      <section className="my-posts">
        <h3>작성한 글</h3>
        <div className="my-posts-header">
          {myPosts.length === 0 ? (
            <p>아직 작성한 글이 없습니다.</p>
          ) : (
            myPosts.map((post, idx) => (
              <div className="post-card" key={post.id}>
                <div className="post-card-row" style={{ alignItems: 'center' }}>
                  <button
                    className="delete-btn"
                    onClick={() => handlePostDelete(post.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      marginLeft: '8px',
                      color: '#b2b2b2',
                    }}
                    title="삭제"
                  >
                    <IoMdTrash size={18} />
                  </button>
                  <div className="post-card-main" style={{ flex: 1 }}>
                    <div
                      className="post-card-title-row"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span className="post-card-title">{post.title}</span>
                    </div>
                    <div className="post-card-meta">
                      약속 · {post.date}
                      {post.time && `, ${post.time.slice(0, 5)}`}
                    </div>
                    <div className="post-card-content">{post.content}</div>
                  </div>
                  {/* > 버튼 클릭 시 수정 모달 */}
                  <IoIosArrowForward
                    className="post-card-arrow"
                    size={20}
                    onClick={() => setEditingPost(post)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                {idx !== myPosts.length - 1 && (
                  <div className="post-card-divider" />
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* 수정 모달 */}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onSave={handlePostUpdate}
          onDelete={handlePostDelete}
          onClose={handleEditCancel} // 취소 시 토스트 알림
        />
      )}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default MyPage;
