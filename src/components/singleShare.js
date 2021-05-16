import React from 'react';
import '../sass/singleShare.scss';

export default class SingleShare extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pricePaidPerShare: 0, // see notes at bottom
      numberOfSharesRemaining: 0,
      transactionsComplete: [],
      completed_transactions: "<div>test</div>"
    };
    this.transactionRef = React.createRef();
    this.toggleRef = React.createRef();
    this.activeRef = React.createRef();
    this.toggleCarat = React.createRef();
    this.toggleShare = this.toggleShare.bind(this);
  }

  toggleShare(){
    let classList = this.toggleRef.current.classList;
    if(classList.contains("toggleShare")){
      this.toggleRef.current.classList.remove("toggleShare");
      this.toggleCarat.current.classList.add("carat_rotate");
      this.activeRef.current.classList.add("showIndividual"); //shows the single info above the shaded section
      //center it
      let items = document.getElementsByClassName("showIndividual");
      let itemWidth = items[0].clientWidth;
      let margin_left = (document.body.clientWidth - itemWidth)/2;
      this.activeRef.current.style.marginLeft = margin_left + "px";
      this.activeRef.current.style.marginTop = (1 * document.documentElement.scrollTop) + "px";
      document.body.querySelector(".shareCoverTarget").classList.add("shareCover");
    }else{
      this.toggleRef.current.classList.add("toggleShare");
      this.toggleCarat.current.classList.remove("carat_rotate");
      document.body.querySelector(".shareCoverTarget").classList.remove("shareCover");
      this.activeRef.current.classList.remove("showIndividual"); //shows the single info above the shaded section
      this.activeRef.current.style.marginLeft ="0px";
      this.activeRef.current.style.marginTop = "0px";
    }
  }
  validTransaction(t){
    // check that the transaction line has valid content
    let validSomethings = ["B", "S", "W", "D", "F"];
    if(
      validSomethings.includes(t.type) &&
        this.isFloat(t.sharePrice) &&
        this.isFloat(t.amount)
    ){ return true;}
    return false;
  }
  isFloat(variable){
    if(typeof parseFloat(variable) == "number"){
      return true;
    }
    return false;
  }
  updateTransations(){
    let transactions = this.props.shareItem.transactions;
    for( let i = 0; i < transactions.length; i++){
      let t = transactions[i];
      if(t.type == "B"){
        let newSharesRemaining = this.state.numberOfSharesRemaining + (t.amount / t.sharePrice);
        let pricePerShare = ((this.state.pricePaidPerShare * this.state.numberOfSharesRemaining) + t.amount) / newSharesRemaining;
        this.state.pricePaidPerShare = pricePerShare;
        this.setState({numberOfSharesRemaining:newSharesRemaining});
      }else if(t.type == "S"){
        if(this.validTransaction(t)){
          let d = new Date(t.timestamp);
          let sharesSold = t.amount/t.sharePrice;
          let pl = t.amount - (sharesSold * this.state.pricePaidPerShare);
          // create transaction complete data
          let transaction = {
            date: d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear() ,
            sharesSold: sharesSold,
            pricePaidPerShare: this.state.pricePaidPerShare,
            priceSold: t.sharePrice,
            profit_loss: pl,
            percent_gain_loss: 0 //TODO calc this
          };
          this.state.transactionsComplete.push(transaction);
          //update the main data
          let newSharesRemaining = this.state.numberOfSharesRemaining - (t.amount / t.sharePrice);
          let pricePerShare = ((this.state.pricePaidPerShare * this.state.numberOfSharesRemaining) - t.amount) / newSharesRemaining;
          this.setState({pricePaidPerShare: pricePerShare});
          this.setState({numberOfSharesRemaining:newSharesRemaining});
        }
      }
    }
    if(this.state.numberOfSharesRemaining * this.state.pricePaidPerShare < 1){
      this.activeRef.current.classList.add("shareInactive");
    }
  }
  insertCompletedTransactions(){
    let rows = "<tr class=\"table_header\"><td>Date sold</td><td>Shares Sold</td><td>P/L</td><td>%</td></tr>";
    this.state.transactionsComplete.map(function(t,i){
      let pl = t.profit_loss.toFixed(2);
      let plp = t.percent_gain_loss.toFixed(1);
      let shares = t.sharesSold.toFixed(2);
      rows += `<tr><td>${t.date}</td><td>${shares}</td><td>$${pl}</td><td>${plp}%</td></tr>`;
    });
    this.transactionRef.current.innerHTML = `<table class='transaction_table'>${rows}</table>`;
  }
  componentDidMount(){
    this.updateTransations();
    this.insertCompletedTransactions();
    // render completed transactiosn as the are created
  }
  render(){
    const completed_transactions = <div></div>;
    return(
      <div ref={this.activeRef} className="shareItem">
        <div className="shareName" onClick={this.toggleShare}>
          <div className="name_row1">{this.props.shareItem.shareName}<span ref={this.toggleCarat} className="share_carat">&#8964;</span></div>
          <div className="name_row2">$115 - 12%</div>
        </div>
        <div ref={this.toggleRef} className="shareInfo toggleShare">
          <div className="shareInfoBox">
            <div className="shareTicker">Ticker: {this.props.shareItem.shareTicker}</div>
            <div className="shareStrategy">Strategy: {this.props.shareItem.shareCategory}</div>
          </div>
          <div className="double_line sharesOutstanding">Shares holding <small>(4dp)</small>: {this.state.numberOfSharesRemaining.toFixed(4)}</div>
          <div className="double_line stillInvestedTotal">Total paid for shares: {this.state.pricePaidPerShare * this.state.numberOfSharesRemaining}</div>
          <div className="double_line stillInvestedPerShare">Average price paid: {this.state.pricePaidPerShare}</div>
          <div className="double_line totalPL">Profit / Loss: {this.props.shareItem.totalPL}</div>
          <div className="moreButton">More Info</div>
          <div className="shareInfoBox moreInfo" ref={this.transactionRef}></div>
        </div>
      </div>
    );
  }
}

/* Notes on Component above */
// pricePaidPerShare is the combined price and is used with numberOfSharesRemaining
// i.e if 3 shares purchased $10 and then 4 shares purchased at $20, then:
//   - numberOfSharesRemaining = 7 and
//   - pricePaidPerShare = 30/7
//
// To add another line with a "B" (buy):
// pricePaidPerShare = (pricePaidPerShare * old_numberOfSharesRemaining) + new_sharePrice) / old_numberOfSharesRemaining + new_numberOfSharesPurchased
// numberOfSharesRemaining =  old_numberOfSharesRemaining + new_numberOfSharesPurchased
