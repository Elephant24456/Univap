import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginIntro from '../pages/LoginIntro';
// import Login from '../pages/Login';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginIntro />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
