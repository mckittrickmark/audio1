import React, { Component } from 'react';

import '../App.css';

//import Overall from '../top-level/overall'
//import SubList from '../top-level/sub_list'
import SubredditTopicChart from '../top-level/subreddit_topic_chart'


class SubredditDetail extends Component {


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Working Title</h1>
        </header>
        <SubredditTopicChart />
      </div>
    )

  }
}

export default SubredditDetail