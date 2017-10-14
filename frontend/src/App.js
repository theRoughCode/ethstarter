import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Ideas from './components/Ideas';
import IdeaCreator from './components/IdeaCreator';

import AppBar from 'material-ui/AppBar';
import { IconButton, FlatButton, FontIcon } from 'material-ui';
import { Opacity } from 'material-ui/svg-icons/action/opacity';
import Store from './Store';

class App extends Component {
  render() {
    return (
      <div className="ideas-page">

        <AppBar title={<span>AngelEth</span>}
                iconElementLeft={<FontIcon className="material-icons">opacity</FontIcon>}
                iconElementRight={<FlatButton label="Create Contract"  />}>
        </AppBar>
        {
          this.props.showIdeas ? <Ideas /> : <IdeaCreator />
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    showIdeas: state.showIdeas,
    showCreate: state.showCreate,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

