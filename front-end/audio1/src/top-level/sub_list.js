import React, { Component } from 'react';

import './sub_list.css';

import SubListItem from '../components/sublist_item'


class SubList extends Component {

  constructor(props){
    super(props);
    this.state = {
      sublist: [1, 2, 3]
    }
  }

  componentDidMount() {

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
        sublist: res
      })


    })
  }


  render() {
    const sublist_items = this.state.sublist.map((item) =>
      <SubListItem itemName={item.name} /> )


    return (
      <div>
        {sublist_items}
      </div>
    )
  }

}

export default SubList