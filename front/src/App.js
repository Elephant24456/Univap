/*
import logo from './logo.svg';
import Test from '../src/components/Test';
import React from 'react';
import './App.css';
import AppRouter from './routes/Router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit src/App.js and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>스프링부트& 리액트 DB 연동 테스트</h1>
      <Test />
      <AppRouter />
    </div>
  );
}

export default App;

 */

import React from 'react';
import Router from './routes/Router'; // 라우팅 컴포넌트 불러오기

function App() {
  return (
    <div className="App">
      <Router />  {/* ✅ 이제 이게 모든 라우팅을 담당함 */}
    </div>
  );
}

export default App;