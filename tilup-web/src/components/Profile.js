import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Profile extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div className="Profile">
        <img src={this.props.img} alt="profileImg" class="Profile__img" />
        <div class="Profile__text">
          <div class="Profile__name">{this.props.name}</div>
          <div class="Profile__id">{this.props.id}</div>
        </div>
        <div class="Profile__table">
          <div class="Profile__table__row">{this.props.organization}</div>
          <div class="Profile__table__row">{this.props.location}</div>
          <div class="Profile__table__row">{this.props.src}</div>
        </div>
        <Button size="small" variant="outlined" className="logoutBtn" onClick={this.handleClickOpen}>
          follow
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Hello World, I got you!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Follow Success!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
