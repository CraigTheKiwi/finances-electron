import React from 'react';
import SingleShare from './singleShare';

export default class ShareData extends React.Component {

  constructor(props){
    super(props);
  }
  render(){
    return(
        <div className="sharesParent">
        {this.props.sharesArray.map((item) => (
          <SingleShare shareItem={item} shareCover={this.props.shareCover}/>
        ))}
      </div>
    );
  }
}
