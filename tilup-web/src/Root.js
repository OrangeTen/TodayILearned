import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainApp from './apps/MainApp';
import ProfileApp from './apps/ProfileApp';
import { PATH } from './consts/consts';
import * as log from "./utils/log";
import * as FirebaseUtils from "./utils/firebaseUtils";


export default class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };

    this.bindWithUser = this.bindWithUser.bind(this);
  }

  componentDidMount() {
    this.bindWithUser();
  }

  bindWithUser() {
    FirebaseUtils.onUserChanged()
      .then((user) => {
        this.setState({
          user: user
        });
      });
  }

  render() {
    log.d(`Root.js`, `render`);

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
