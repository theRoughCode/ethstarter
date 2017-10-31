import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Ideas from './components/Ideas';
import IdeaCreator from './components/IdeaCreator';
import IdeaCreatorX from './components/IdeaCreatorX';

import AppBar from 'material-ui/AppBar';
import {FlatButton, FontIcon } from 'material-ui';

import WEB3 from './crypto/metamask';
console.log('web3 Instance: ', WEB3);

class App extends Component {

  componentDidMount() {
    const address = WEB3.eth.coinbase;
    this.props.saveUserAddress(address);
    this.props.goToHome();
  }
  openContractCreation() {
    this.props.openContractCreation();
  }

  goHome() {
    this.props.goBack();
  }
  render() {
    let actionBtn;
    if (this.props.showIdeas) {
      actionBtn = <FlatButton label="Create Contract" onClick={this.openContractCreation.bind(this)} />
    }

    return (
      <div className="ideas-page">
        <AppBar title={<span>AngelEth</span>} style={{backgroundColor: '#004080', paddingLeft: '64px', paddingRight: '64px'}}
                iconElementLeft={<FontIcon className="material-icons" style={{fontSize: '48px'}} >opacity</FontIcon>}
                onTitleTouchTap={this.goHome.bind(this)}
                iconElementRight={actionBtn}>
        </AppBar>
        {
          this.props.showIdeas ? <Ideas ideas={[]} /> : <IdeaCreatorX />
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
    },
    saveUserAddress: (address) => {
      dispatch({
        type: 'GOT_USER_ADDRESS',
        payload: {
          userAddress: address,
        }
      })
    },
    goBack: () => {
      dispatch({
        type: 'LANDED',
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

