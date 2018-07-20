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
      hasPrevSignedinUserChecked,
    } = this.props;

    let body = '';
    if (!hasPrevSignedinUserChecked) {
      body = <Loading />;
    } else if (user == null) {
      body = <Signin />;
    } else {
      body = <Feed />;
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
    hasPrevSignedinUserChecked: state.firebase.hasPrevSignedinUserChecked,
  };
}

export default connect(mapStateToProps)(Home);
