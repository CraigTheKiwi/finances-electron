import './App.css';
import HeaderInfo from './components/headerinfo';
import CurrentShares from './components/currentshares';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <HeaderInfo />
      <hr />
      <h1> Current Shares </h1>
      <CurrentShares />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <content className="App-content">

      </content>
    </div>
  );
}

export default App;
