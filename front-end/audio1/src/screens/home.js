import React, { Component } from 'react';

import '../App.css';

import Overall from '../top-level/overall'
import SubList from '../top-level/sub_list'
import TopicList from '../top-level/topic_list'
import NavBar from '../top-level/navbar'


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
        <NavBar />
        <header className="App-header">
          <h1 className="App-title">Welcome to Working Title</h1>
        </header>
        <Overall/>
        <SubList trx={this.props.trx}/>
        <TopicList trx={this.props.trx}/>
        <p> {this.props.trx.spaghetti} </p>
      </div>
    )

  }
}

export default HomeScreen