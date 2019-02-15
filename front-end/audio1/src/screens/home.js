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
      subredditArray: [],
      topicList: []
    }
  }

  fetchTopicIndex() {
    fetch(`http://127.0.0.1:3001/topics`, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": true,
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
    }).then(response => {

      return response.json()
    }).then(res => {
      console.log(res)
      this.setState({topicList: res.sankey_objects})

    })
  }

   fetchSubredditInfo() {
    fetch('http://127.0.0.1:3001/subreddits/', {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": true,
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
    }).then(response => {

      return response.json()
    }).then(res => {
      console.log(res)
      this.setState({
        subredditArray: res.subreddit_objects
      })
    })
  }

  componentDidMount() {
    this.fetchSubredditInfo()
    this.fetchTopicIndex()
  }


  render() {

    return (
      <div className="App">
        <NavBar />
        <header className="App-header">
          <h1 className="App-title">Welcome to Working Title</h1>
        </header>
        <Overall/>
        <h2>Subreddits</h2>
        <SubList subredditArray={this.state.subredditArray} />
        <h2>Topics</h2>
        <TopicList topicList={this.state.topicList} />
        <p> {this.props.trx.spaghetti} </p>
      </div>
    )

  }
}

export default HomeScreen