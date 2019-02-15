import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../App.css';
import './topic_index.css';

import NavBar from '../top-level/navbar'
import TopicList from '../top-level/topic_list'

class TopicIndex extends Component {

  constructor(props){
    super(props);
    this.state = {
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

  componentDidMount() {
    this.fetchTopicIndex()
  }



  render() {

    //this should be at least one level more of components...


    return (
      <div className="App">
        <NavBar />

        <header className="App-header">
          <h1 className="App-title"> Topics Index</h1>
        </header>
        <TopicList topicList={this.state.topicList} />
      </div>
    )

  }
}

export default TopicIndex