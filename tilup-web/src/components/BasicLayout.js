import React, { Component } from 'react';
import './BasicLayout.css';

export default class Profile extends Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        );
    }
}
