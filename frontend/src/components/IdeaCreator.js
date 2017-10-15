import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, FlatButton, TextField } from 'material-ui';
import axios from 'axios';
import moment from 'moment';

class IdeaCreator extends Component {

  createContract() {
    axios
      .post('/proposals/create', {
        title: this.state.title,
        description: this.state.desc,
        price: this.state.price,
        royalty: this.state.royalty,
        milestone: [
          {
            profit: '100',
            amount: '500',
            timestamp: moment('17/10/28').unix(),
          },
          {
            profit: '120',
            amount: '1000',
            timestamp: moment('17/11/28').unix(),
          },
          {
            profit: '200',
            amount: '2000',
            timestamp: moment('17/12/28').unix(),
          },
        ]
      })
      .then(response => {
        if (response.data) {
          this.props.contractCreated(response.data)
        }
      });

  }

  cancel() {
    this.props.cancel();
  }

  render() {
    return (
      <div className="page">
        <Card>
          <form className="idea-form">
            <TextField className="idea-title"
               id="idea-title"
               hintText="Idea Name"
               floatingLabelText="Give The Idea a Name"
               type="string"
               style={{width: '100%'}}
               onChange={(e) => this.setState({ title: e.target.value})}
            />
            <TextField className="idea-description"
               id="idea-description"
               multiLine={true}
               hintText="Describe your idea in detail..."
               floatingLabelText="Description"
               type="string"
               rows={3}
               style={{width: '100%'}}
               onChange={(e) => this.setState({ desc: e.target.value})}
            />
            <TextField className="idea-price"
               id="idea-price"
               hintText="5000"
               floatingLabelText="Amount To Raise"
               type="number"
               min="0"
               style={{width: '100%'}}
               onChange={(e) => this.setState({ price: e.target.value})}
            />
            <TextField className="idea-royalty"
               id="idea-royalty"
               hintText="40%"
               floatingLabelText="Percentage of Profits to Share"
               type="number"
               min="0" max="80"
               style={{width: '100%'}}
               onChange={(e) => this.setState({ royalty: e.target.value * 0.01})}
            />
            <FlatButton className="create-btn" label="Create Contract" primary={true} onClick={this.createContract.bind(this)} />
            <FlatButton className="cancel-btn" label="Cancel" primary={false} onClick={this.cancel.bind(this)} />
          </form>
        </Card>
      </div>
    )
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
    cancel: () => {
      dispatch({type: 'CREATE_CANCELLED'});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaCreator);
