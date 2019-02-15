import React from 'react';
import {Sankey} from 'react-vis'

import history from '../history'

export default class TopicSanKey extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }


  newLink = (event, datapoint) => {

    const url_name = datapoint.name.replace(' ', '_')

    if (this.props.screen === "detail") {

      this.props.trx.updateTopicName(event, url_name)
      history.push(`/topics/${url_name}`)

    } else {
      history.push(`/topics/${url_name}`)

    }

  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    if (window.innerWidth > 700){
      if (this.props.screen === "detail") {
        this.setState({ width: window.innerWidth, height: window.innerWidth/3 });
      } else {
        this.setState({ width: window.innerWidth/2, height: window.innerWidth/6 });
      }
    }
  }



  render() {
    const nodes = this.props.nodes
    const links = this.props.links

    return (
      <Sankey
        nodes={nodes}
        links={links}
        width={this.state.width}
        height={(this.state.height)}
        nodeWidth={20}
        onValueClick={(datapoint, event)=>{
          this.newLink(event, datapoint)
        }}
      />
    )
  }

}