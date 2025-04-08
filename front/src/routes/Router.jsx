import { Routes, Route } from 'react-router-dom';
import LoginIntro from '../pages/LoginIntro';
// import Login from '../pages/Login';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginIntro />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
};

export default AppRouter;
