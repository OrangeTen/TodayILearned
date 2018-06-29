import React, { Component } from 'react';
import {Button, Input} from "react-materialize";

export default class TilInput extends Component {
  render() {
    return (
      <div>
        <form>
          <Input type='textarea' />
          <Button waves='light'>submit</Button>
        </form>
      </div>
    );
  }
}
