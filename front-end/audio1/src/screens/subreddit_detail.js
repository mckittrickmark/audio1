import React, { Component } from 'react';

import '../App.css';

import SubredditTopicChart from '../top-level/subreddit_topic_chart'
import NavBar from '../top-level/navbar'

class SubredditDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      subredditName: ""
    }
  }


  componentDidMount() {
    const { subredditID } = this.props.match.params
    console.log(subredditID)

    fetch(`http://127.0.0.1:3001/subreddits/:subredditID?subredditID=${subredditID}`, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": true,
          "Accept": "application/json",
          "Content-Type": "application/json",
          "data": {subredditID: subredditID}
      }
    }).then(response => {

      return response.json()
    }).then(res => {
      console.log(res)
      this.setState({subredditName: res.name})

    })
  }



  render() {

    return (
      <div className="App">
        <NavBar />

        <header className="App-header">
          <h1 className="App-title">{this.state.subredditName}</h1>
        </header>
        <p> {this.props.variable1} </p>
        <SubredditTopicChart />
      </div>
    )

  }
}

export default SubredditDetail