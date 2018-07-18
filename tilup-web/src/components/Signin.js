import React from 'react';
import Button from '@material-ui/core/Button';

import logo from '../components/logo.png'


const Signin = () => (
  <div className="pleaseLogin">
    <img src={logo} alt="pleaseLoginLogo" className="pleaseLogin__logo" />
    <Button variant="extendedFab" color="#000" className="pleaseLogin__btn" onClick={this.handleLogin}>
      <img src="/res/octocat.svg" alt="octocat" className="pleaseLogin__icon" />
      Login with GitHub
    </Button>
  </div>
);

export default Signin;
