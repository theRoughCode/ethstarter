import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Ideas from './components/Ideas';
import IdeaCreator from './components/IdeaCreator';

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
    let actionBtns;
    if (this.props.showIdeas) {
      let actionBtn = <FlatButton label="Create Contract" onClick={this.openContractCreation.bind(this)} />
      let actionBtn2 = <FlatButton label="Sign up" id="civicSignupBtn" />
      actionBtns = <div>{actionBtn}{actionBtn2}</div>
    }

    return (
      <div className="ideas-page">
        <AppBar title={<span>AngelEth</span>}
                iconElementLeft={<FontIcon className="material-icons" style={{fontSize: '48px'}}>opacity</FontIcon>}
                iconElementRight={actionBtns}>
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

