import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Overall from './top-level/overall'
import SubList from './top-level/sub_list'



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      field1: null,
      field2: null
    }
  }

  componentDidMount () {
    console.log("DID MOUNT")

    fetch('http://127.0.0.1:3001', {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": true,
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
    }).then(response => {

      return response.json()
    }).then(res => {

      this.setState({
        field1: res.field1,
        field2: res.field2
      })
    })

  }

  render () {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Working Title</h1>
        </header>
        <Overall/>
        <SubList/>
      </div>
    );
  }
}

export default App;
