import React, { Component } from 'react';
import './navigation-bar.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from './logo.png'
import realLogo from './real_logo.png'
import startEasterEgg from '../utils/startEasterEgg'
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import * as FirebaseUtils from "../utils/firebaseUtils";
import * as log from "../utils/log";

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

  getSigninOrUserIcon() {
    const user = this.props.user;

    return user ? (
      <React.Fragment>
        <Link to="/profile">
          <img src={user.photoURL} style={{width: "40px", borderRadius: "50%", marginRight: "5px", marginLeft: "5px"}} />
        </Link>
        <div className="userName d-none d-sm-block">
          <Link to="/profile">
            <span style={{color:"#fff"}}>{user.displayName}</span>
          </Link>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Button color="inherit" className="d-none d-sm-block" onClick={this.handleLogin}>Login with GitHub</Button>
        <Button color="inherit" className="d-sm-none" onClick={this.handleLogin}>Login</Button>
      </React.Fragment>
    )
  }

  handleLogin() {
    FirebaseUtils.requestLogin()
      .then(_ => {
        window.location.reload();
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
  };

  handleSubmit = (event) => {
    log.d("componnts/NavigationBar.js", "handleSubmit", "키코", event, event.keyCode)
    if (event.keyCode === 13) {
      log.d("componnts/NavigationBar.js", "handleSubmit", `query=${this.state.query}`);
      window.location.assign(`/search/${this.state.query}`);
    }
  };

  render() {
    return (
      <AppBar position="sticky" color="default" className="navigation-bar">
        <Toolbar className="container">
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

          { this.getSigninOrUserIcon() }

        </Toolbar>
        <div style={{display: "none"}}>
          <img id="source" src={realLogo} width="300" height="227" />
        </div>
      </AppBar>
    );
  }
}
