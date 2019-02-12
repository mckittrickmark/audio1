import React, { Component } from 'react';

import '../App.css';

import NavBar from '../top-level/navbar'

class SubredditIndex extends Component {

  constructor(props){
    super(props);
    this.state = {
      subredditName: ""
    }
  }


  componentDidMount() {

  }



  render() {

    return (
      <div className="App">
        <NavBar />

        <header className="App-header">
          <h1 className="App-title">Subreddit Index</h1>
        </header>
        <p>"hello, world!" </p>
      </div>
    )

  }
}

export default SubredditIndex