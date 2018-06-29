import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class TilInput extends Component {
  render() {
    return (
      <div>
        <form>
          <TextField
            id="multiline-static"
            multiline
            rows="4"
            margin="normal"
          />
          <Button>submit</Button>
        </form>
      </div>
    );
  }
}
