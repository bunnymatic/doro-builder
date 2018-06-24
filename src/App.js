import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EntityForms from "./components/EntityForms/EntityForms";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Generate your Doro Game State Here!</h1>
        </header>
        <main className="App-intro">
        <EntityForms />
        </main>
      </div>
    );
  }
}

export default App;
