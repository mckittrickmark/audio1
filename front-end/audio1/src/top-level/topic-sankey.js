import React from 'react';
import {Sankey} from 'react-vis'
import {Link, Redirect, context} from 'react-router-dom'

import history from '../history'

export default class TopicSanKey extends React.Component {

  newLink = (event, datapoint) => {
    const url_name = datapoint.name.replace(' ', '_')
    console.log(this.props.trx)
    this.props.trx.updateTopicName(event, url_name)
    history.push(`/topics/${url_name}`)

  }


  render() {


    const nodes = this.props.nodes
    const links = this.props.links

    return (
      <Sankey
        nodes={nodes}
        links={links}
        width={this.props.stateVars.width}
        height={(this.props.stateVars.width/3)}
        onValueClick={(datapoint, event)=>{
          this.newLink(event, datapoint)
        }}
      />
    )
  }

}