import React, {Component} from 'react';
import { Card, CardHeader, CardText } from 'material-ui';
import { connect } from 'react-redux';
import axios from 'axios';

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
    if (this.props.address && !this.props.idea) {
      console.log('adx: ', this.props.address);
      axios.get('/proposals/' + this.props.address)
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
    } else {
      this.setState({
        idea: {...this.props}
      })
    }
  }
  render() {
    const priceLabel = 'Price: ' + this.state.idea.price;
    return (
      <Card className="idea-box">
        <CardHeader
          title={this.state.idea.title}
          subtitle={priceLabel} />
        {
          this.state.idea.lastInvestment &&
          <CardText>
            <div className="last-paid">Last Investment: {this.state.idea.lastInvestment}</div>
            <div className="growth">Growth Rate: {this.state.idea.growth}</div>
          </CardText>
        }
        <CardText>{this.state.idea.description}</CardText>
      </Card>
    )
  }
}


const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaDetails);