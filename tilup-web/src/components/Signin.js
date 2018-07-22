import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";

import logo from '../components/logo.png'
import {
  firebasePopupFacebookSignin, firebasePopupGithubSignin
} from "../actions/firebase";
import {connect} from "react-redux";


const Signin = (props) => {
  let body = "";
  if (props.user) {
    body = "Already signed in.";
  } else {
    body = (
      <div className="pleaseLogin">
        <img src={logo} alt="pleaseLoginLogo" className="pleaseLogin__logo"/>
        <Button variant="extendedFab" color="#000" className="pleaseLogin__btn"
                onClick={props.firebasePopupGithubSignin}>
          <img src="/res/octocat.svg" alt="octocat" className="pleaseLogin__icon"/>
          Signin with GitHub
        </Button>
        <br/>
        <Button variant="extendedFab" color="#000" className="pleaseLogin__btn"
                onClick={props.firebasePopupFacebookSignin}>
          Signin with Facebook
        </Button>
      </div>
    );
  }

  return body;
};

const mapDispatchToProps = {
  firebasePopupGithubSignin,
  firebasePopupFacebookSignin,
};

function mapStateToProps(state) {
  return {
    user: state.firebase.user,
    hasPrevSignedinUserChecked: state.firebase.hasPrevSignedinUserChecked,
    isSigningOut: state.firebase.isSigningOut,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
