import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

class IdeaCreator extends Component {

  createContract() {
    const sample = {
      title: 'Burger8',
      description: 'A place where you can only buy burgers in packs of 8',
      price: 5000,
    };
    axios
      .post('/submit', {
        title: this.state.title,
        description: this.state.desc,
        price: this.state.price,
      })
      .then(response => {
        console.log('res: ', response);
      })
  }

  cancel() {
    // Store.dispatch({
    //   type: 'CANCEL_CREATION'
    // })
  }

  render() {
    return (
      <div className="page">
        <form className="idea-form">
          <TextField className="idea-title"
             id="idea-title"
             hintText="Idea Name"
             floatingLabelText="Give The Idea a Name"
             type="string"
             style={{width: '100%'}}
             onChange={(e) => this.setState({ title: e.target.value})}
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
          <FlatButton className="create-btn" label="Create Contract" primary={true} onClick={this.createContract.bind(this)} />
          <FlatButton className="cancel-btn" label="Cancel" primary={false} onClick={this.cancel.bind(this)} />
        </form>
      </div>
    )
  }
}

export default IdeaCreator;
