import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

export default class TilItem extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          {this.props.data.contents}
        </CardContent>
        <CardActions>
          <Button size="small">button</Button>
        </CardActions>
      </Card>
    );
  }
}
