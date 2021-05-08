import React from 'react';

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
        <div className="shareTicker">{this.props.shareItem.shareTicker}</div>
        <div className="shareStrategy">{this.props.shareItem.shareCategory}</div>
        <div className="sharesOutstanding">{this.props.shareItem.sharesOutstanding}</div>
        <div className="totalPL">{this.props.shareItem.totalPL}</div>
      </div>
    );
  }
}
