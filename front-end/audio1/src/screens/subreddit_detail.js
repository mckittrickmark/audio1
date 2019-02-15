import React, { Component } from 'react';

import '../App.css';

import NavBar from '../top-level/navbar'
import VerticalBarChart from '../top-level/vertical_bar'

class SubredditDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      subredditName: "",
      plottedXY: [{x: "A", y:200}, {x: "B", y:100}]
    }
  }

  fetchSubredditInfo(subredditName) {
    fetch(`http://127.0.0.1:3001/subreddits/${subredditName}`, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": true,
          "Accept": "application/json",
          "Content-Type": "application/json",
          "data": {subredditName: subredditName}
      }
    }).then(response => {
      return response.json()
    }).then(res => {
      console.log(res)
      this.setState({subredditName: res.subreddit.name,
                      plottedXY: res.topics_plotted})

    })
  }

  //plottedXY: res.topics_plotted

  componentDidMount() {
    const { subredditName } = this.props.match.params
    console.log(subredditName)

    this.fetchSubredditInfo(subredditName)

  }



  render() {

    return (
      <div className="App">
        <NavBar />
        <header className="App-header">
          <h2 className="App-title">/r/{this.state.subredditName}</h2>
        </header>
        <p> {this.props.variable1} </p>
        <div className="Main-container">
          <h3 className="Chart-title">Topics by Weight</h3>
          <VerticalBarChart data={this.state.plottedXY} screen="subreddit-detail"/>
        </div>
      </div>
    )

  }
}

export default SubredditDetail