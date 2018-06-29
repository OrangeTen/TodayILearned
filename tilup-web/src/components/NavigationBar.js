import React, { Component } from 'react';
import './navigation-bar.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import * as firebase from 'firebase'
import logo from './logo.png'
import realLogo from './real_logo.png'
import startEasterEgg from '../utils/startEasterEgg'
import firebase from 'firebase';
import getUserData from '../utils/getUserData';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
// import { Link } from 'react-router'
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      easterCount: 10,
      optionList: [
        { text: "Inbox" },
        { text: "JavaScript" },
        { text: "Interview Questions" },
      ],
      query: ""
    };
    
  }

  handleLogin() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("로긴됨", user, token)
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

  handleEasterEgg = () => {
    // this.setState({easterCount: this.state.easterCount - 1})
    this.setState(function(prevState, props){
      return {easterCount: prevState.easterCount -1}
   });
    if(this.state.easterCount <= 1) {
      startEasterEgg();
    }
  }

  handleSubmit = (event) => {
    console.log("키코", event, event.keyCode)
    if (event.keyCode === 13) {
      console.log(this.state.query);
      window.location.assign(`/search/${this.state.query}`);
    }
  }

  render() {
    const userData = getUserData();
    return (
      <AppBar position="sticky" color="default" className="navigation-bar">
        <Toolbar>
          {
            this.state.easterCount <= 0? 
              (
                <React.Fragment>
                  <img src={realLogo} className="logo" />
                  <Typography variant="title" color="inherit" className="navigation-bar__title">TILUP with DecOrange!</Typography>  
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <img src={logo} className="logo" style={{opacity: this.state.easterCount/10}} onClick={this.handleEasterEgg}/> 
                  <Link to="/" style={{color: "white", textDecoration: "none"}}><Typography variant="title" color="inherit" className="navigation-bar__title">TILUP</Typography>  </Link>
                </React.Fragment>
              ) 
          }
          <div className="search-container">
            <Icon>search</Icon>
            <input placeholder="Drop the query!" onKeyUp={this.handleSubmit} onChange={(query) => this.setState({query: query.target.value})} />
          </div>
          <div className="padding"></div>
          

          {userData ? (
            <React.Fragment>
              <img src={userData.photoURL} style={{width: "40px", borderRadius: "50%", marginRight: "5px"}} />
              <div className="userName">
                {userData.displayName}
              </div>
            </React.Fragment>
          ) : (
            <Button color="inherit" onClick={this.handleLogin}>Login with GitHub</Button>
          )}
        </Toolbar>
        <div style={{display: "none"}}>
          <img id="source" src={realLogo} width="300" height="227" />
        </div>
      </AppBar>
    );
  }
}
