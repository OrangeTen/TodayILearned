import React, { Component } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export default class NavigationBar extends Component {
  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          커밋각
        </Toolbar>
      </AppBar>
    );
  }
}
