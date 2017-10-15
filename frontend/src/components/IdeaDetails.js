import React, {Component} from 'react';
import { Card, CardTitle, Paper, CardMedia, CardText, FlatButton, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import axios from 'axios';
import WEB3 from '../crypto/metamask';
import moment from 'moment';

class IdeaDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idea: {
        price: '',
        title: '',
        growth: '',
        description: '',
        lastInvestment: '',
      }
    }
  }
  componentDidMount() {
    if (this.props.idea && this.props.idea.contractAddress) {
      this.setState({
        idea: {...this.props.idea}
      })
    } else {
      console.log('adx: ', this.props.address);
      axios.get('/proposals/address/' + this.props.address)
        .then(response => {
          console.log(response);
          this.setState({
            idea: {
              price: '12',
              title: '',
              growth: '',
              description: '',
              lastInvestment: '',
            }
          })
        });
    }
  }

  invest = () => {
    const proposalAddress = this.state.idea && this.state.idea.contractAddress;
    const investorAddress = WEB3.eth.coinbase;
    axios
      .post('/proposals/invest', {
        proposalAddress: proposalAddress,
        investorAddress: investorAddress,
        timeStamp: moment().unix(),
      })
      .then(response => {
        if (response && typeof response.data === 'string') {
          // Success
          this.props.invested();
        } else {
          // error
        }
      });
  };

  render() {
    const priceLabel = 'Price: ' + this.state.idea.price;
    const cardTitle = (
      <CardTitle title={this.state.idea.title} subtitleColor="red" style={{display: 'flex', justifyContent: 'space-between'}}>
        <Paper style={{backgroundColor: 'orange', padding: '8px', width: 'fit-content'}} zDepth={1}>
          ${this.state.idea.price}
        </Paper>
      </CardTitle>
    );
    return (
      <Card className="idea-box">
        <CardMedia overlay={cardTitle}>
          <div style={{width: '100%', backgroundColor: '#004893', height: '360px'}}></div>
        </CardMedia>
        <CardText style={{display: 'flex', justifyContent: 'space-between'}}>
          <p>{this.state.idea.description}</p>
          <RaisedButton label="Invest" primary={true} style={{marginLeft: '12px'}} onClick={this.invest.bind(this)} />
        </CardText>
      </Card>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userAddress: state.userAddress,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    invested: () => {
      dispatch({
        type: 'INVESTED',
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaDetails);