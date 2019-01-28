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

    const subredditDetailSelect = (subredditID, subredditName) => {
      this.setState({subredditID: subredditID, subredditName: subredditName})
      console.log(this.state.subredditID)
      console.log(this.state.subredditName)

    }

    const trx = {
      subredditDetailSelect: subredditDetailSelect,
      spaghetti: "spaghetti"
    }


    const stateVars = {
      subredditID: this.state.subredditID,
      subredditName: this.state.subredditName
    }

    //const subredditID = this.state.subredditID

    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={(props) => (
            <HomeScreen {...props} trx={trx} stateVars={stateVars}/>)} />
          <Route exact path={`/subreddits/:subredditID`} render={(props) => (
            <SubredditDetail {...props} trx={this.trx} stateVars={stateVars}/>)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
