import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

class App extends Component {
  render() {
    return (
      <div className="ideas-page">
        <AppBar title="EthStarter" iconElementLeft='' />
        <RaisedButton label="Default" />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
