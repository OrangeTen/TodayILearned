import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainApp from './apps/MainApp';
import Home from './containers/Home';
import ProfileApp from './apps/ProfileApp';
import { PATH } from './consts/consts';


export default class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* Main App */}
          <Route exact path="/" render={() =>
            (
              <MainApp
                user={this.state.user}
                type={PATH.MAIN}
              />
            )}/>
          <Route exact path="/home" render={() =>
            (
              <Home
                type={"HOME"}
              />
            )}/>
          <Route exact path="/search/:string" render={({match}) =>
            (
              <MainApp
                user={this.state.user}
                type={PATH.SEARCH}
                data={match.params.string}
              />
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
          <Route exact path="/profile" render={({match}) =>
            (
              <ProfileApp
                user={this.state.user}
                data={1}
                id={match.params.id}
              />
            )}/>
        </div>
      </BrowserRouter>
    )
  }
}
