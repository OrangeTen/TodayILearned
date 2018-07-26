import React, { Component } from "react";
import { connect } from "react-redux";

import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";
import Signin from "../components/Signin";
import Feed from "./Feed";
import TilInput from "../components/TilInput";


class Home extends Component {
  render() {
    const {
      user,
      isSigningIn,
    } = this.props;

    let body = '';
    if (isSigningIn) {
      body = <Loading />;
    } else if (user == null) {
      body = <Signin />;
    } else {
      body = (
        <div className="container" style={{marginTop:'50px'}}>
          <TilInput />
          <Feed />
        </div>
      );
    }

    return (
      <div>
        <NavigationBar />
        { body }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.firebase.user,
    isSigningIn: state.user.isSigningIn,
  };
}

export default connect(mapStateToProps)(Home);
