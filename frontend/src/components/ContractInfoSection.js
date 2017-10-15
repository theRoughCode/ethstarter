import React, { Component } from 'react';
import { TextField, Card, FlatButton } from 'material-ui';

class ContractInfoSection extends Component {

  componentWillUpdate(nextProps, nextState) {
    nextState.isValid = (nextState.title && nextState.desc && nextState.price && nextState.royalty);
    if (nextState.isValid) {
      this.props.infoCB({
        title: nextState.title,
        description: nextState.desc,
        price: nextState.price,
        royalty: nextState.royalty,
      });
    }
  }

  render() {
    return (
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
        </form>
      </Card>
    )
  }
}

export default ContractInfoSection;