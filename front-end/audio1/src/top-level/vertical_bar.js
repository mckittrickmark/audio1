import React from 'react';
import {VerticalBarSeries, XYPlot, LabelSeries, XAxis, YAxis, ChartLabel} from 'react-vis'

import './vertical_bar.css';

import history from '../history'



export default class VerticalBarChart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {width: 600,
                  height: 400}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  newLink = (event, datapoint) => {

    const url_name = datapoint.x.replace(' ', '_')

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
    if (this.props.screen === "index") {
      this.setState({ width: window.innerWidth/2, height: window.innerWidth/(5) });
    } else {
      this.setState({ width: window.innerWidth, height: window.innerWidth/(5/2) });
    }
  }



  render() {
    console.log(this.props.data)

    const data = this.props.data
    const chartWidth = this.state.width / 1.2
    const chartHeight = this.state.height
    const chartDomain = [0, data[0].y * 1.1]

    return (
      <XYPlot
        margin={{left: 100}}
        xType="ordinal"
        width={chartWidth}
        height={chartHeight}
        yDomain={chartDomain}
        className="Vertical-bar"
      >
        <VerticalBarSeries className="Vertical-bar-chart" data={data}
        onValueClick={(datapoint, event)=>{
          this.newLink(event, datapoint)
        }}/>
        <LabelSeries data={data.map(obj => {
          return { ...obj, label: obj.y }
        })}
        labelAnchorX="middle"
        labelAnchorY="text-after-edge"
        />
        <XAxis />
        <YAxis />
        <ChartLabel
          text="Topic Weight"
          includeMargin={true}
          xPercent={0.04}
          yPercent={0.25}
          style={{
            transform: 'rotate(-90)',
          }}
        />
      </XYPlot>
    )
  }

}