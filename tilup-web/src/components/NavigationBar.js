import React, { Component } from 'react';
import './navigation-bar.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import * as firebase from 'firebase'
import firebase from 'firebase';
import getUserData from '../utils/getUserData';

export default class NavigationBar extends Component {
  handleLogin() {
    var provider = new firebase.auth.GithubAuthProvider();
    console.log("login", provider);
    

    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("로긴됨", user, token)

      firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
        console.log(`idtoken = [${idToken}]`);
        // Send token to your backend via HTTPS
        // ...
      }).catch(function(error) {
        // Handle error
      });

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  render() {
    return (
      <AppBar position="sticky" color="default" className="navigation-bar">
        <Toolbar>
          <Typography variant="title" color="inherit" className="navigation-bar__title">
          TILUP 🍊
          </Typography>
          {getUserData() ? (
            <div className="userName">
              {getUserData().displayName}
            </div>
          ) : (
            <Button color="inherit" onClick={this.handleLogin}>Login with GitHub</Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
