import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from "react-redux";

import MainApp from './apps/MainApp';
import Home from './containers/Home';
import ProfileApp from './apps/ProfileApp';
import { PATH } from './consts/consts';
import Loading from "./components/Loading";
import NavigationBar from "./components/NavigationBar";
import Search from "./components/Search";


class Root extends Component {
  render() {
    let body = <Loading />;

    if (this.props.isInitialized) {
      body = (
        <div>
          <NavigationBar />
          {/* Main App */}
          <Route exact path="/" render={() =>
            <Home />
          } />
          <Route exact path="/search/:query" render={({match}) =>
            (
              <Search query={match.params.query} />
            )}/>
          <Route exact path="/repo/:index" render={({match}) =>
            (
              <MainApp
                user={this.state.user}
                type={PATH.REPO}
                index={match.params.index}
              />
            )}/>
          <Route exact path="/til/:index" render={({match}) =>
            (
              <MainApp
                user={this.state.user}
                type={PATH.TIL}
                index={match.params.index}
              />
            )}/>

          {/* ProfileApp */}
          <Route exact path="/profile" render={({_}) =>
            (
              <ProfileApp />
            )}/>
        </div>
      );
    }

    return (
      <BrowserRouter>
        { body }
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    isInitialized: state.firebase.isInitialized,
  };
}

export default connect(mapStateToProps)(Root);
