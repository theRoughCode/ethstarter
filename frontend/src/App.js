import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Ideas from './components/Ideas';
import IdeaCreator from './components/IdeaCreator';

import AppBar from 'material-ui/AppBar';
import {FlatButton, FontIcon } from 'material-ui';

class App extends Component {

  openContractCreation() {
    this.props.openContractCreation();
  }

  render() {
    let actionBtn;
    if (this.props.showIdeas) {
      actionBtn = <FlatButton label="Create Contract" onClick={this.openContractCreation.bind(this)} />
    }
    return (
      <div className="ideas-page">
        <AppBar title={<span>AngelEth</span>}
                iconElementLeft={<FontIcon className="material-icons">opacity</FontIcon>}
                iconElementRight={actionBtn}>
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
  return {
    openContractCreation: () => {
      dispatch({
        type: 'NEW_CONTRACT'
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

