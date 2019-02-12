import React, { Component, UpdateBlocker} from 'react';
import { Link, withRouter, Router} from 'react-router-dom'

import '../App.css';
import './topic_detail.css';

import history from '../history'

import NavBar from '../top-level/navbar'
import TopicSanKey from '../top-level/topic-sankey'

class TopicDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      topicInfo: [],
      topicSources: [],
      topicSinks: [],
      nodes: [],
      links:[],
      topicName: ""
    }

  }

  fetchTopicInfo(topicName) {
    console.log("FUCK")
    fetch(`http://127.0.0.1:3001/topics/${topicName}`, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": true,
          "Accept": "application/json",
          "Content-Type": "application/json",
          "data": {topicName: topicName}
      }
    }).then(response => {

      return response.json()
    }).then(res => {
      console.log(res)
      this.setState({
          topicInfo: res.topic_info,
          topicSources: res.topic_sources,
          topicSinks: res.topic_sinks,
          topicName: topicName,
          nodes: res.nodes,
          links: res.links})

    })
  }




  componentDidMount() {
    const { topicName } = this.props.match.params

    this.fetchTopicInfo(topicName)

    console.log("------------ history")


  }

  componentWillReceiveProps() {
    const { topicName } = this.props.match.params

    //this.fetchTopicInfo(topicName)
  }

  updateTopicName = (e, name) => {
      console.log(name)
      this.fetchTopicInfo(name)
  }

  trx = this.props.trx



  render() {

    this.trx.updateTopicName = this.updateTopicName


    const topicSourcesList = this.state.topicSources.map((item, index) =>
      <Link key={index} to={`/topics/${item.topic_pair_source}`} >
        <li  onClick={e => this.updateTopicName(e, item.topic_pair_source)}>{item.topic_pair_source}: {item.weight}</li>
      </Link>)

    const topicSinksList = this.state.topicSinks.map((item, index) =>
      <Link key={index} to={`/topics/${item.name}`} >
        <li onClick={e => this.updateTopicName(e, item.name)} >{item.name}: {item.weight}</li>
      </Link>)


    return (
      <div className="App">
        <NavBar />
        <header className="App-header">
          <h1 className="App-title">{this.state.topicInfo.name}</h1>
        </header>
        <div className="Sankey-Container">
          <TopicSanKey nodes={this.state.nodes} links={this.state.links} trx={this.trx} stateVars={this.props.stateVars} />
        </div>
        <div className="tempContainer">
          <div className="tempInner">
            <h1>SOURCES</h1>

              <ul>
                {topicSourcesList}
              </ul>

          </div>
          <div className="tempInner">
            <h1>SINKS</h1>
            <ul>
              {topicSinksList}
            </ul>
          </div>
        </div>
      </div>
    )

  }
}

export default withRouter(TopicDetail)