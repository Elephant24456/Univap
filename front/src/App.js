import logo from './logo.svg';
import './App.css';
import Test from '../src/components/Test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit src/App.js and save to reload.
        </p>
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
    </div>
  );
}

export default App;
