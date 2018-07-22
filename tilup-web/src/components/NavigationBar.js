import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import logo from './logo.png'
import realLogo from './real_logo.png'
import './navigation-bar.css';
import startEasterEgg from '../utils/startEasterEgg'
import * as log from "../utils/log";
import {
  firebasePopupGithubSignin, firebasePopupFacebookSignin, firebaseSignout,
} from "../actions/firebase";
import Loading from "./Loading";


class NavigationBar extends Component {
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
    const { user, hasPrevSignedinUserChecked } = this.props;

    let signinOrUserIcon = '';
    if (!hasPrevSignedinUserChecked) {
      signinOrUserIcon = <Loading />;
    } else if (user == null) {
      signinOrUserIcon = (
        <React.Fragment>
          <Button color="inherit" className="d-none d-sm-block" onClick={this.props.firebasePopupGithubSignin}>Signin with GitHub</Button>
          <Button color="inherit" className="d-none d-sm-block" onClick={this.props.firebasePopupFacebookSignin}>Signin with Facebook</Button>
        </React.Fragment>
      );
    } else {
      signinOrUserIcon = (
        <React.Fragment>
          <Link to="/profile">
            <img src={user.photoURL} alt="profilePhoto" style={{width: "40px", borderRadius: "50%", marginRight: "5px", marginLeft: "5px"}} />
          </Link>
          <div className="userName d-none d-sm-block">
            <Link to="/profile">
              <span style={{color:"#fff"}}>{user.displayName}</span>
            </Link>
          </div>

          <Button disabled={this.props.isSigningOut}
                  color="inherit" className="d-none d-sm-block"
                  onClick={this.props.firebaseSignout}>
            Signout
          </Button>
        </React.Fragment>
      );
    }

    return signinOrUserIcon;
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
    log.d("components/NavigationBar.js", "handleSubmit", "키코", event, event.keyCode);
    if (event.keyCode === 13) {
      log.d("components/NavigationBar.js", "handleSubmit", `query=${this.state.query}`);
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
                  <img src={realLogo} alt="logo" className="logo" />
                  <Typography variant="title" color="inherit" className="navigation-bar__title">TILUP with DecOrange!</Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <img src={logo} alt="logo" className="logo" style={{opacity: this.state.easterCount/10}} onClick={this.handleEasterEgg}/>
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
          <img id="source" src={realLogo} alt="realLogo" width="300" height="227" />
        </div>
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.firebase.user,
    hasPrevSignedinUserChecked: state.firebase.hasPrevSignedinUserChecked,
    isSigningOut: state.firebase.isSigningOut,
  };
}

const mapDispatchToProps = {
  firebasePopupGithubSignin,
  firebasePopupFacebookSignin,
  firebaseSignout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);
