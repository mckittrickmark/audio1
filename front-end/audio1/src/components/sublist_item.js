import React from 'react';

import { Link } from 'react-router-dom'

import './sublist_item.css';

function SubListItem (props) {

  const clickSubreddit = (e) => {
    props.trx.subredditDetailSelect(props.subreddit_id, props.subredditName)

  }

  return (
    <Link to={`/subreddits/${props.subreddit_id}`} >
    <div className="sublistItem" onClick={clickSubreddit}>
      <div className="infoBox">
        <p>{props.subredditName}</p>
      </div>
      <div className="resultsBox">
        <p> Comments: {props.numberComments} </p>

      </div>
    </div>
    </Link>
  )
}

export default SubListItem
