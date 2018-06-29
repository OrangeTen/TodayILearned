import React, { Component } from 'react';
import {Navbar} from "react-materialize";

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar brand={
        <div>
          <img src="res/octocat.svg" />
        </div>
      } right>
      </Navbar>
    );
  }
}
