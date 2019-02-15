import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './sub_list.css';
import '../App.css';
import '../screens/subreddit_index.css';

import VerticalBarChart from '../top-level/vertical_bar'


class SubList extends Component {


  render() {

    console.log(this.props.subredditArray)
    const subredditsIndexList = this.props.subredditArray.map((item, key) =>
      <div>
      <Link to={`/subreddits/${item.subreddit.name}`} style={{ textDecoration: 'none', color: 'black' }} className="Subreddit-name-link" ><h3 className="Subreddit-name">{item.subreddit.name}</h3></Link>
        <div className="Index-subreddit">
          <div className="Vertical-bar-container">
            <VerticalBarChart data={item.topics_plotted} screen="index"/>
          </div>
          <div className="Index-subreddit-info">
          </div>
        </div>
      </div>
    )

    return (
      <div>
        {subredditsIndexList}
      </div>
    )
  }

}

export default SubList