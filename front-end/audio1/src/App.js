import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'


import './App.css';

import HomeScreen from './screens/home'
import SubredditDetail from './screens/subreddit_detail'

const homeScreen = () => {
  return (
    <HomeScreen />
  );
}

const subredditDetailScreen = () => {
  return (
    <SubredditDetail />
  )
}



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      field1: null,
      subredditID: 0,
      subredditName: ""
    }

  }

  render () {

    this.subredditDetailSelect = (subredditID, subredditName) => {
      this.setState({subredditID: subredditID, subredditName: subredditName})
    }

    this.trx = {
      subredditDetailSelect: this.subredditDetailSelect
    }


    const stateVars = {
      subredditID: this.state.subredditID,
      subredditName: this.state.subredditName
    }

    return (
      <BrowserRouter>
        <Route path="/" component={homeScreen} />
      </BrowserRouter>
    );
  }
}

export default App;
