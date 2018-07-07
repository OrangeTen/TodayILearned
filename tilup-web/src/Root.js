import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainApp from './apps/MainApp';
import ProfileApp from './apps/ProfileApp';
import { PATH } from './consts/consts';
import * as FirebaseUtils from "./utils/firebaseUtils";

const Root = () => {
  FirebaseUtils.initializeFirebase();

  return (
    <BrowserRouter>
      <div>
        {/* Main App */}
        <Route exact path="/" render={() =>
          (
            <MainApp type={PATH.MAIN} />
          )}/>
        <Route exact path="/search/:string" render={({match}) =>
          (
            <MainApp type={PATH.SEARCH} data={match.params.string}/>
          )}/>
        <Route exact path="/repo/:index" render={({match}) =>
          (
            <MainApp type={PATH.REPO} index={match.params.index}/>
          )}/>
        <Route exact path="/til/:index" render={({match}) =>
          (
            <MainApp type={PATH.TIL} index={match.params.index}/>
          )}/>

        {/* ProfileApp */}
        <Route exact path="/profile" render={({match}) =>
          (
            <ProfileApp data={1} id={match.params.id}/>
          )}/>
      </div>
    </BrowserRouter>
  )
};

export default Root;
