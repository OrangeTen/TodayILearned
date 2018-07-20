import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';

import * as log from "./log";
import firebaseConfig from "../consts/firebaseConfig";


export function getToken() {
  return firebase.auth().currentUser ?
    firebase.auth().currentUser.getIdToken(false) :
    new Promise((res) => res(null));
}

export function getInitializedApp() {
  const app = firebase.initializeApp(firebaseConfig);

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      log.d(`utils/firebaseUtils.js`, `firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)`, `persistent setted`);
    })
    .catch((error) => {
      log.d(`utils/firebaseUtils.js`, `firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)`, `error=${error}`);
    });

  return app;
}

export function getGithubProvider() {
  return new firebase.auth.GithubAuthProvider();
}

export function getFacebookProvider() {
  return new firebase.auth.FacebookAuthProvider();
}

export function requestLogin() {
  const provider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then(result => {
      const token = result.credential.accessToken;
      const user = result.user;
      log.d(`utils/firebaseUtils.js`, `requestLogin`, `Login success user=${user}, token=${token}`);
    }).catch((error) => {
      log.d(`utils/firebaseUtils.js`, `requestLogin`, `Login failed error=${error}`);
    });
}

export function requestLogout() {
  return firebase.auth().signOut();
}
