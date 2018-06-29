import React, { Component } from 'react';
import {Card, CardTitle} from "react-materialize";

export default class TilItem extends Component {
  render() {
    return (
      <Card className='small'
            header={<CardTitle>Card Title</CardTitle>}
            actions={[<a href='#'>This is a Link</a>]}>
        {this.props.data.contents}
      </Card>
    );
  }
}
