import React, { Component } from 'react';
import data from '../data/fakeIdeas';
import '../styling/ideas.css';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

class Ideas extends Component {

  goToIdea(id) {

  }
  render() {
    return (
      <div className="page">
        <Grid container className="ideas-grid">
            {
              data.map(idea => {
                const priceLabel = 'Price: ' + idea.price;
                return (
                  <Grid item xs={4} onClick={this.goToIdea(idea.id)}>
                    <Card className="idea-box">
                      <CardHeader
                        title={idea.title}
                        subheader={priceLabel} />
                      <CardContent>
                        <Typography component="p">
                          {idea.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })
            }
        </Grid>
      </div>
    )
  }
}

export default Ideas;