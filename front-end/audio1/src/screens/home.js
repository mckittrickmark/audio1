import React, { Component } from 'react';

import '../App.css';

import Overall from '../top-level/overall'
import SubList from '../top-level/sub_list'


class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      field1: null,
      field2: null
    }
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Working Title</h1>
        </header>
        <Overall/>
        <SubList/>
      </div>
    )

  }
}

export default HomeScreen