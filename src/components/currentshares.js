import React from 'react';
import Papa from 'papaparse';
import ShareData from './sharedata';

export default class CurrentShares extends React.Component {

  constructor(props){
    super(props);
    this.state = {sharesArray: []};
  }
  componentDidMount(){
    this.BuildShareData();
    console.log(this.state.sharesArray);
  }



  // Calculate and update shares based on object created from parsing CSV
  /*  share object:
   *  share = {
   *    shareName: a,
   *    shareTicker: g
   *    shareCategory: b,
   *    sharePrice: f, (average across all purchases)
   *    sharesOutstanding: c, (add and subtract as each share loaded)
   *    totalPL: d (profit/loss as %)
   *    transactions: e (transaction object)
   *  }
   *  transaction = {
   *    timestamp:a,
   *    transactionType:b,
   *    sharePrice: d,
   *    amount: e
   *    }
   */
  listedShares = [];
  // let sharesArray = []; //holds share objects

  async BuildShareData(){
    // swap out line below when updating to database (connect to sql and build object to replace csvData)
    var csvData = await this.GetData();
    if (csvData !== "undefined" && typeof csvData === "object"){
      for(let i = csvData.data.length -1; i >= 0; i--){ // because csv has newest at top
        this.buildSharesArray(csvData.data[i], i);
      }
    }
  }

  buildSharesArray(shareInfo, row){
    // check if shareInfo valid
    try{
      if(this.shareIsValid(shareInfo)){
        // check if share exists in the array
        let shareExists = false;
        if (this.listedShares.includes(shareInfo[3].toUpperCase())){
          shareExists = true;
        }
        // add data or create new share
        if(shareExists){
          this.addDataToShare(shareInfo);
        }else{
          this.createNewShare(shareInfo);
        }

      }else{
        console.log("Share isn't valid, please review the csv file:");
        console.log("row :" + row +" (0 indexed)");
      }
    }catch (err){
      console.log("Error building share");
      console.log(err);
    }
  }
  createNewShare(shareInfo){
    let share = {};
    share.shareName = shareInfo[4];
    share.shareTicker = shareInfo[3];
    share.shareCategory = shareInfo[5];
    share.sharePrice = shareInfo[7];
    share.Invested = parseFloat(shareInfo[6]);
    share.sharesOutstanding = (parseFloat(shareInfo[6])*0.995)/parseFloat(shareInfo[7]);
    share.totalPL = this.tickerPrice(share.shareTicker);
    share.transactions = [];
    share.currency = shareInfo[8];

    this.listedShares.push(shareInfo[3].toUpperCase());

    let transaction = {};
    transaction.timestamp = this.createTimestamp(shareInfo[0]);
    transaction.type = shareInfo[1];
    transaction.sharePrice = shareInfo[7];
    transaction.amount = shareInfo[6];
    transaction.PL = 0;
    share.transactions.push(transaction);
    this.state.sharesArray.push(share);
  }
  createTimestamp(dateString){
    dateString = dateString.split("/");
    return Date.parse(parseInt(dateString[1])+" "+parseInt(dateString[0])+" "+parseInt(dateString[2]));
  }
  tickerPrice(ticker){
    //TODO scrape ticker price
    return 0;
  }
  addDataToShare(shareInfo){
    // find share in array
    let share = null;
    for (let i = 0; i < this.state.sharesArray.length; i++){
      if(this.state.sharesArray[i].shareTicker.toUpperCase() === shareInfo[3].toUpperCase()){
        share = this.state.sharesArray[i];
        break;
      }
    }
    //modify the share data

    //create a transaction for it
    let transaction = {};
    transaction.timestamp = this.createTimestamp(shareInfo[0]);
    transaction.type = shareInfo[1];
    transaction.sharePrice = shareInfo[7];
    transaction.amount = shareInfo[6];
    transaction.PL = 0;
    share.transactions.push(transaction);
  }

  // Checks to make sure share is valid
  shareIsValid(shareInfo){
    // Index [Date,Buy/Sell,Investment Type,Ticker,Name,Category,Amount,Share price]
    // Check date
    if (!this.validDate(shareInfo[0])) { return false; };
    // Check variable B/S/W/D/F (Buy, Sell, Watch, Dividend, Fees)
    if (!this.validVar(shareInfo[1])) { return false; };
    // Check all strings valid
    if (!this.parseStrings([shareInfo[2],shareInfo[3],shareInfo[4]], shareInfo[5])) { return false; }
    // Check ints / floats valid
    if (!this.parseNumbers([shareInfo[6],shareInfo[7]])) { return false; }
    return true;
  }
  validDate(dateString){
    let dateVals = dateString.split("/");
    if( dateVals && dateVals.length === 3 ){
      for ( let i = 0; i < dateVals.length; i++){
        if( isNaN(parseInt(dateVals[i])) ){
          return false;
        }
      }
      return true;
    }
    return false;
  }
  validVar(shareVar){
    let validVars = ["B", "S", "W", "D", "F"];
    if( validVars.includes(shareVar.toUpperCase()) ){
      return true;
    }
    return false;
  }
  parseStrings(strings){
    for (let s = 0; s < strings.length; s++){
      if( typeof strings[s] !== "string" ){
        return false;
      }
    }
    return true;
  }
  parseNumbers(numbers){
    for ( let n = 0; n < numbers.length; n++){
      if( isNaN( parseFloat(numbers[n]) ) ){
        return false;
      }
    }
    return true;
  }


  // Prep CSV for use -- Delete below when switching to SQL
  async GetData() {
    var data = Papa.parse(await this.fetchCsv());
    // remove top line so data is usable from index 0 (to allow switching to database queries easily)
    data.data.shift();
    return data;
  }
  async fetchCsv() {
    const response = await fetch('datafiles/shares_sheet1.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
  }

  render(){
    return (
      <>
        <div> ...loading your data ... </div>
        <div> ... be patient ... </div>
        <br />
        <ShareData sharesArray = {this.state.sharesArray} />
      </>
    );
  }
}
