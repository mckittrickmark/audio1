import React, { Component } from 'react';

import './sub_list.css';

import TopicListItem from '../components/topic_list_item'


class TopicList extends Component {

  constructor(props){
    super(props);
    this.state = {
      topicList: []
    }
  }

  componentDidMount() {

    fetch('http://127.0.0.1:3001/topics/', {
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
        topicList: res
      })


    })
  }


  render() {
    const topic_list_items = this.state.topicList.map((item, index) =>
      <TopicListItem className="topicListItem" topicName={item.name} weight={item.weight} topic_id={item.id} key={index} trx={this.props.trx}/> )
    console.log(topic_list_items)
    return (
      <div>
        <h1> TOPICS </h1>
        {topic_list_items}
      </div>
    )
  }

}

export default TopicList