import React, { Component } from 'react';
import './MainApp.css';
import { PATH } from '../consts/consts';

class MainApp extends Component {
  render() {
    let result = '';
    if (this.props.type === PATH.SEARCH) {
      result = (
        <React.Fragment>
          <div>검색 결과</div>
          <div>{this.props.data}</div>
        </React.Fragment>
      )
    } else if (this.props.type === PATH.REPO) {
      result = (
        <React.Fragment>
          <div>REPO VIEW</div>
          <div>index NUM : {this.props.index}</div>
        </React.Fragment>
      )
    } else if (this.props.type === PATH.TIL) {
      result = (
        <React.Fragment>
          <div>TIL PAGE</div>
          <div>inde NUM : {this.props.index}</div>
        </React.Fragment>
      )
    }

    return (
      <div className="MainApp">
        MainPage<br />
        {result}
      </div>
    );
  }
}

export default MainApp;
