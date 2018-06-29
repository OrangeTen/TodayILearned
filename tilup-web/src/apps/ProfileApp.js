import React, { Component } from 'react';
import './ProfileApp.css';

class ProfileApp extends Component {
  render() {
    return (
      <div className="ProfileApp">
        My Page{this.props.data}<br />
        Your id is {this.props.id}
      </div>
    );
  }
}

export default ProfileApp;
