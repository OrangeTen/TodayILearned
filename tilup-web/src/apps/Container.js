import React, { Component } from 'react';
import './container.css';
import { PATH } from '../consts/consts';
import TilItem from "../components/TilItem";
import TilInput from "../components/TilInput";
import NavigationBar from "../components/NavigationBar";
import {getTilList} from "../actions";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (
      <div>
        <NavigationBar />
        <div className="appinitializeFirebase-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Container;
