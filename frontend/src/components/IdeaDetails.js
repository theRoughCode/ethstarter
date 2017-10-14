import React, {Component} from 'react';
import { Card, CardHeader, CardText } from 'material-ui';
import { connect } from 'react-redux';

class IdeaDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card className="idea-box">
        <CardHeader
          title={this.props.idea.title}
          subtitle={this.props.idea.priceLabel} />
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