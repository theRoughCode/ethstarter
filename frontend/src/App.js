import React, { Component } from 'react';
import './App.css';
import Ideas from './components/Ideas';
import IdeaCreator from './components/IdeaCreator';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
// import Typography from 'material-ui/Typography';

class App extends Component {
  render() {
    return (
      <div className="ideas-page">
        <AppBar position="static" color="default">
        </AppBar>
        <IdeaCreator />
      </div>
    );
  }
}

export default App;
