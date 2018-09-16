import React, { Component } from 'react';
import Example1 from './examples/Example1';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to React Horizontal Scroll Wrapper Examples
          </h1>
        </header>
        <div className="examples">
          <Example1 />
          <Example1 />
        </div>
      </div>
    );
  }
}

export default App;
