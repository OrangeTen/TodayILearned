import React, { Component } from 'react';
import './MyApp.css';

class MyApp extends Component {
  render() {
    return (
      <div className="MyApp">
        My Page{this.props.data}<br />
				Your id is {this.props.id}
      </div>
    );
  }
}

export default MyApp;
