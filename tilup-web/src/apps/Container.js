import React, { Component } from 'react';
import './container.css';
import NavigationBar from "../components/NavigationBar";
import * as log from "../utils/log";

class Container extends Component {
  constructor(props) {
    super(props);
    log.d(`apps/Container.js`, `constructor`);

    this.state = {
    };
  };

  render() {
    log.d(`apps/Container.js`, `render`);

    return (
      <div>
        <NavigationBar />
        <div className="app-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Container;
