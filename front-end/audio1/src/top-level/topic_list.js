import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './topic_list.css';

import TopicListItem from '../components/topic_list_item'
import TopicSanKey from '../top-level/topic-sankey'


class TopicList extends Component {


  render() {
    const topicSankeyList = this.props.topicList.map((item, key) =>
        <div>
        <Link to={`/topics/${item.nodes[0].name}`} className="topic-name-link" style={{ textDecoration: 'none', color: 'black' }} ><h3 className="topic-name">{item.nodes[0].name} </h3> </Link>
          <div className="Index-topic">
            <div className="Sankey-container-index">
              <TopicSanKey key={key} nodes={item.nodes} links={item.links} trx={this.props.trx} stateVars={this.props.stateVars} screen={"index"} />
            </div>
            <div className="Index-topic-info">
              <div className="Index-topic-info column">
                <h4>Sources</h4>
                <ul>
                {item.topic_sources.map((item, key) => {
                return (
                  <Link key={key} to={`/topics/${item.topic_pair_source}`} >
                    <li>{item.topic_pair_source}: {item.weight}</li>
                  </Link>)
                })}
                </ul>
              </div>
              <div className="Index-topic-info column">
                <h4>Sinks</h4>
                <ul>
                {item.topic_sinks.map((item, index) =>
                  <Link key={index} to={`/topics/${item.topic_pair_sink}`} >
                    <li>{item.topic_pair_sink}: {item.weight}</li>
                  </Link>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )

    return (
      <div>
        {topicSankeyList}
      </div>
    )
  }

}

export default TopicList