import React, { Component } from 'react';

import './overall.css';


class Overall extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="overallMain">
        <div className="overallBox">Left Stuff</div>
        <div className="overallBox">Middle Stuff</div>
        <div className="overallBox">Right Stuff</div>
      </div>

    );
  }


}

export default Overall