import React, {Component} from 'react';
import { Card, CardHeader, CardText } from 'material-ui';
import { connect } from 'react-redux';

class IdeaDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const priceLabel = 'Price: ' + this.props.idea.price;
    return (
      <Card className="idea-box">
        <CardHeader
          title={this.props.idea.title}
          subtitle={priceLabel} />
        {
          this.props.idea.lastInvestment &&
          <CardText>
            <div className="last-paid">Last Investment: {this.props.idea.lastInvestment}</div>
            <div className="growth">Growth Rate: {this.props.idea.growth}</div>
          </CardText>
        }
        <CardText>{this.props.idea.description}</CardText>
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