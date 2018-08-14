import React from 'react';
import { connect } from "react-redux";

import './Signin.css';
import {
  firebasePopupFacebookSignin, firebasePopupGithubSignin
} from "../actions/firebase";


const Signin = (props) => {
  let body = "";
  if (props.user) {
    body = "Already signed in.";
  } else {
    body = (
      <div className="signin">
        <div className="signin__container">
          <img src="/res/logo_black.png" alt="signinLogo" className="signin__logo"/>
          <span className="signin__title">Sign in to TILUP</span>
          <div className="signin__github" onClick={props.firebasePopupGithubSignin}>
            <div className="signin__github__logo">
              <img src="/res/github_logo.svg" width="26px"/>
            </div>
            <div className="signin__btn__text">
            Continue with Github
            </div>
          </div>
          <div className="signin__fb" onClick={props.firebasePopupFacebookSignin}>
            <div className="signin__fb__logo">
              <img src="/res/facebook.svg" width="26px"/>
            </div>
            <div className="signin__btn__text">
            Continue with Facebook
            </div>
          </div>
        </div>
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
    isSigningIn: state.user.isSigningIn,
    isSigningOut: state.firebase.isSigningOut,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
