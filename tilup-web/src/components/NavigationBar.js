import React, { Component } from 'react';
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";

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
