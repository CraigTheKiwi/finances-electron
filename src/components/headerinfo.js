import React from 'react';

export default class HeaderInfo extends React.Component {
  render(){
    return (
      <div className="realtimeInfo">
        <div>
          <h3>Gold Price</h3>
          <div className="itemInfo">
            <div id="goldPrice">$1,755</div>
            <div id="goldChanges" className="itemChanges">
              <div id="gold24h" className="red">24 H
                <span className="direction">&#9650;</span>
                <span className="value">3.8%</span>
              </div>
              <div id="gold7d" className="green">7 D
                <span className="direction">&#9660;</span>
                <span className="value">-8.8%</span>
              </div>
              <div id="gold30d" className="red">30 D
                <span className="direction">&#9650;</span>
                <span className="value">8.8%</span>
              </div>
              <div id="gold1y" className="green"> 1 Y
                <span className="direction">&#9660;</span>
                <span className="value">-8.8%</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>BTC Price</h3>
          <div className="itemInfo">
            <div id="btcPrice">$1,755</div>
            <div id="btcChanges" className="itemChanges">
              <div id="btc24h" className="green">24 H
                <span className="direction">&#9650;</span>
                <span className="value">3.8%</span>
              </div>
              <div id="btc7d" className="red">7 D
                <span className="direction">&#9660;</span>
                <span className="value">-8.8%</span>
              </div>
              <div id="btc30d" className="green">30 D
                <span className="direction">&#9650;</span>
                <span className="value">8.8%</span>
              </div>
              <div id="btc1y" className="red"> 1 Y
                <span className="direction">&#9660;</span>
                <span className="value">-8.8%</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>S&P Price</h3>
          <div className="itemInfo">
            <div id="spPrice">$1,755</div>
            <div id="spChanges" className="itemChanges">
              <div id="sp24h" className="green">24 H
                <span className="direction">&#9650;</span>
                <span className="value">3.8%</span>
              </div>
              <div id="sp7d" className="red">7 D
                <span className="direction">&#9660;</span>
                <span className="value">-8.8%</span>
              </div>
              <div id="sp30d" className="green">30 D
                <span className="direction">&#9650;</span>
                <span className="value">8.8%</span>
              </div>
              <div id="sp1y" className="red"> 1 Y
                <span className="direction">&#9660;</span>
                <span className="value">-8.8%</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>NZX Price</h3>
          <div className="itemInfo">
            <div id="nzxPrice">$1,755</div>
            <div id="nzxChanges" className="itemChanges">
              <div id="nzx24h" className="green">24 H
                <span className="direction">&#9650;</span>
                <span className="value">3.8%</span>
              </div>
              <div id="nzx7d" className="red">7 D
                <span className="direction">&#9660;</span>
                <span className="value">-8.8%</span>
              </div>
              <div id="nzx30d" className="green">30 D
                <span className="direction">&#9650;</span>
                <span className="value">8.8%</span>
              </div>
              <div id="nzx1y" className="red"> 1 Y
                <span className="direction">&#9660;</span>
                <span className="value">-8.8%</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>Share Value</h3>
          <div className="itemInfo">
            <div id="sharesPrice">$1,755</div>
            <div id="sharesChanges" className="itemChanges">
              <div id="shares24h" className="green">24 H
                <span className="direction">&#9650;</span>
                <span className="value">3.8%</span>
              </div>
              <div id="shares7d" className="red">7 D
                <span className="direction">&#9660;</span>
                <span className="value">-8.8%</span>
              </div>
              <div id="shares30d" className="green">30 D
                <span className="direction">&#9650;</span>
                <span className="value">8.8%</span>
              </div>
              <div id="shares1y" className="red"> 1 Y
                <span className="direction">&#9660;</span>
                <span className="value">-8.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
