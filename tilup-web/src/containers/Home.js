import React, { Component } from "react";
import { connect } from "react-redux";

import NavigationBar from "../components/NavigationBar";
import Loading from "../components/Loading";
import Signin from "../components/Signin";
import Feed from "./Feed";


class Home extends Component {
  render() {
    const {
      user,
      isFetchingSignedinUser,
    } = this.props;

    let body = '';
    if (user == null && !isFetchingSignedinUser) {
      body = <Signin />;
    } else if (isFetchingSignedinUser) {
      body = <Loading />;
    } else {
      body = <Feed />
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
    isFetchingSignedinUser: state.firebase.isFetchingSignedinUser,
  };
}

export default connect(mapStateToProps)(Home);
