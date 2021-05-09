import React from 'react';
import '../sass/singleShare.scss';

export default class SingleShare extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log("loaded");
  }
  render(){
    return(
      <div className="shareItem">
        <div className="shareName">{this.props.shareItem.shareName}</div>
        <div className="shareInfoBox">
          <div className="shareTicker">Ticker: {this.props.shareItem.shareTicker}</div>
          <div className="shareStrategy">Strategy: {this.props.shareItem.shareCategory}</div>
        </div>
        <div className="sharesOutstanding">Shares: {this.props.shareItem.sharesOutstanding}</div>
        <div className="totalPL">Profit / Loss: {this.props.shareItem.totalPL}</div>
        <div className="moreButton">More Info</div>
        <div className="moreInfo"></div>
      </div>
    );
  }
}
