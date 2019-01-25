import React from 'react';

import './sublist_item.css';

function SubListItem (props) {

  return (
    <div className="sublistItem">
      <div className="infoBox">
        <p>{props.itemName}</p>
      </div>
      <div className="resultsBox">
        <p> Comments: {props.numberComments} </p>
      </div>
    </div>
  )
}

export default SubListItem
