import './App.css';
import HeaderInfo from './components/headerinfo';
import CurrentShares from './components/currentshares';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderInfo />
      </header>
      <content className="App-content">

        <hr />
        <h1> Current Shares </h1>
        <CurrentShares />
      </content>
    </div>
  );
}

export default App;
