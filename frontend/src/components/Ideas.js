import React, { Component } from 'react';
import { connect } from 'react-redux';
import data from '../data/fakeIdeas';
import '../styling/ideas.css';

import Card, { CardHeader, CardText } from 'material-ui/Card';
// import Typography from 'material-ui/Typography';
// import Grid from 'material-ui/Grid';

class Ideas extends Component {

  goToIdea(id) {

  }
  render() {
    return (
      <div className="page">
        <div className="ideas-grid">
            {
              data.map(idea => {
                const priceLabel = 'Price: ' + idea.price;
                return (
                  <div key={idea.id} className="ideas-item" onClick={this.goToIdea(idea.id)}>
                    <Card className="idea-box">
                      <CardHeader
                        title={idea.title}
                        subtitle={priceLabel} />
                      <CardText>{idea.description}</CardText>
                    </Card>
                  </div>
                )
              })
            }
        </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Ideas);