import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginIntro from "../pages/LoginIntro";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Write from "../pages/Write";
import MyPage from "../pages/MyPage";
import Chatting from "../pages/Chatting";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginIntro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chatting" element={<Chatting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
