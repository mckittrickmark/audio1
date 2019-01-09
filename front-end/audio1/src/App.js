import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      field1: null,
      field2: null
    }
  }

  componentDidMount(){
    console.log("DID MOUNT")

    fetch('http://127.0.0.1:8000/sample', {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": true,
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
    }).then(response => {

      return response.json()
    }).then(res => {
      let apiData = res[0]
      this.setState({
        field1: apiData.name,
        field2: apiData.description
      })
    })

  }

  render() {
    console.log("TEST")
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Django</h1>
        </header>
        <p className="App-intro">
          A react app with a django backend
          field1: { this.state.field1}
           field2: {this.state.field2}
        </p>
      </div>
    );
  }
}

export default App;
