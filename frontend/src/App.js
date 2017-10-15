import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Ideas from './components/Ideas';
import IdeaCreator from './components/IdeaCreator';
import IdeaCreatorX from './components/IdeaCreatorX';

import AppBar from 'material-ui/AppBar';
import {FlatButton, FontIcon } from 'material-ui';

class App extends Component {

  componentDidMount() {
    this.props.goToHome();
  }
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
        <AppBar title={<span>AngelEth</span>} style={{backgroundColor: '#004080', paddingLeft: '64px', paddingRight: '64px'}}
                iconElementLeft={<FontIcon className="material-icons" style={{fontSize: '48px'}}>opacity</FontIcon>}
                iconElementRight={actionBtn}>
        </AppBar>
        {
          this.props.showIdeas ? <Ideas /> : <IdeaCreatorX />
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    showIdeas: state.showIdeas || !(state.showCreate),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openContractCreation: () => {
      dispatch({
        type: 'NEW_CONTRACT'
      })
    },
    goToHome: () => {
      dispatch({
        type: 'LANDED'
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

