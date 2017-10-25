import 'react-rollup-boilerplate/dist/styles.css';
import React, { Component } from 'react';
import HelloWorld from 'react-rollup-boilerplate';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <HelloWorld />
      </div>
    );
  }
}

export default App;
