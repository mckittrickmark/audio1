import React, { Component } from 'react';



import '../App.css';
import './subreddit_index.css';

import NavBar from '../top-level/navbar'

import SubList from '../top-level/sub_list'

class SubredditIndex extends Component {

  constructor(props){
    super(props);
    this.state = {
      subredditArray:[]
    }
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
  }



  render() {

    console.log(this.state.subredditArray)

    return (
      <div className="App">
        <NavBar />

        <header className="App-header">
          <h1 className="App-title">Subreddit Index</h1>
        </header>
        <SubList subredditArray={this.state.subredditArray} />
      </div>
    )

  }
}

export default SubredditIndex