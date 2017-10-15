import React, { Component } from 'react';
import { TextField, Card, FlatButton, DatePicker } from 'material-ui';
import moment from 'moment';

class Milestones extends Component {

  constructor(props) {
    super(props);
    this.state = {
      milestones: [{index: 1}],
    }
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.isValid = (nextState.title && nextState.desc && nextState.price && nextState.royalty);
    this.props.milestoneCB(this.state.milestones);
  }

  addMilestone = () => {
    const milestones = this.state.milestones;
    milestones.push({
      index: milestones.length + 1
    });
    this.setState({
      milestones: milestones
    })
  };

  render() {
    return (
      <Card>
        <form className="idea-form">
          {
            this.state.milestones.map(milestone => {
              return (
                <div key={milestone.index}>
                  <TextField className="milestone-price"
                             id="milestone-price"
                             hintText="Price to achieve milestone (ex: 100 ether)"
                             floatingLabelText="Price to achieve milestone (Ether)"
                             type="number"
                             style={{width: '100%'}}
                             onChange={(e) => { milestone.price = e.target.value; }}
                  />
                  <TextField className="milestone-amount"
                             id="milestone-amount"
                             hintText="Funds to Withdraw Upon Achieving This Milestone.."
                             floatingLabelText="The Funds to Withdraw"
                             type="number"
                             style={{width: '100%'}}
                             onChange={(e) => { milestone.amount = e.target.value; }}
                  />
                  <DatePicker className="milestone-date"
                             id="milestone-date"
                             hintText="Date To Achieve Milestone"
                             style={{width: '100%', marginTop: '24px'}}
                             onChange={(e, date) => { milestone.date = moment(date).unix(); }}
                  />
                </div>
              )
            })
          }
        </form>
        <FlatButton
          label="Add Milestone"
          onClick={this.addMilestone.bind(this)}
          style={{margin: '24px'}}
        />
      </Card>
    )
  }
}

export default Milestones;