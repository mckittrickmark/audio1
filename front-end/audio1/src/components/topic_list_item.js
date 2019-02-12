import React from 'react';

import { Link } from 'react-router-dom'

import './sublist_item.css';

function TopicListItem (props) {


  return (
    <Link to={`/topics/${props.topic_id}`} >
    <div className="sublistItem">
      <div className="infoBox">
        <p>{props.topicName}</p>
      </div>
      <div className="resultsBox">
        <p>Weight: {props.weight} </p>
      </div>
    </div>
    </Link>
  )
}

export default TopicListItem
