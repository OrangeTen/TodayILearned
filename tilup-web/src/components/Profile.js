import React, { Component } from 'react';
import styles from './Profile.css';
import Button from "@material-ui/core/Button";

export default class Profile extends Component {
    render() {
        return (
            <div className="Profile">
                <img src={this.props.img} class="Profile__img" />
                <div class="Profile__text">
                    <div class="Profile__name">{this.props.name}</div>
                    <div class="Profile__id">{this.props.id}</div>
                </div>
                <div class="Profile__table">
                    <div class="Profile__table__row">{this.props.organization}</div>
                    <div class="Profile__table__row">{this.props.location}</div>
                    <div class="Profile__table__row">{this.props.src}</div>
                </div>
                <Button size="small" variant="outlined" className="logoutBtn">
                    LogOut
                </Button>
            </div>
        );
    }
}
