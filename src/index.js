import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

let goldData = [];
let btcData = [];
let sandPData = [];
function scrapeBTCprice(){
  let today = new Date().toISOString().slice(0, 10);
  let startDate = new Date();
  startDate.setDate(startDate.getDate() - 365);
  startDate = startDate.toISOString().slice(0, 10);
  fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${today}`)
    .then(response => response.json())
    .then(data => console.log(data));
}
function scrapeSP500(){

}
function scrapeGold(){}
scrapeBTCprice()
