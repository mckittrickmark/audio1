import React, { Component } from 'react';
import {Router, Route, Switch, Link} from 'react-router-dom'
import history from './history'


import './App.css';

import HomeScreen from './screens/home'

import SubredditDetail from './screens/subreddit_detail'
import TopicDetail from './screens/topic_detail'

import SubredditIndex from './screens/subreddit_index'
import TopicIndex from './screens/topic_index'



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      field1: null,
      subredditID: 0,
      subredditName: "",
      width: 0,
      height:0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
      subredditName: this.state.subredditName,
      width: this.state.width,
      height: this.state.height
    }

    //const subredditID = this.state.subredditID

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={(props) => (
            <HomeScreen {...props} trx={trx} stateVars={stateVars}/>)} />

            <Route exact path={`/subreddits`} render={(props) => (
              <SubredditIndex {...props} trx={trx} stateVars={stateVars}/>)} />

            <Route exact path={`/subreddits/:subredditID`} render={(props) => (
              <SubredditDetail {...props} trx={trx} stateVars={stateVars}/>)} />

            <Route exact strict path={`/topics`} render={(props) => (
              <TopicIndex {...props} trx={trx} stateVars={stateVars}/>)} />

            <Route exact path={`/topics/:topicName`} render={(props) => (
              <TopicDetail {...props} trx={trx} stateVars={stateVars}/>)} />
            <Route path="empty" component={null} key="empty"/>
        </Switch>
      </Router>
    );
  }
}

export default App;
