import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";

import logo from '../components/logo.png'
import { firebasePopupGithubSignin } from "../actions/firebase";

const Signin = (props) => (
  <div className="pleaseLogin">
    <img src={logo} alt="pleaseLoginLogo" className="pleaseLogin__logo" />
    <Button variant="extendedFab" color="#000" className="pleaseLogin__btn" onClick={props.firebasePopupGithubSignin}>
      <img src="/res/octocat.svg" alt="octocat" className="pleaseLogin__icon" />
      Login with GitHub
    </Button>
  </div>
);

const mapDispatchToProps = {
  firebasePopupGithubSignin
};


export default connect(()=>{}, mapDispatchToProps)(Signin);

