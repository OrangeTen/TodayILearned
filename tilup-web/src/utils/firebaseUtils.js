import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import * as log from "./log";

export function onUserChanged() {
  return new Promise((res, rej) => {
    firebase.auth().onAuthStateChanged((user) => {
      log.d(`utils/firebaseUtils.js`, `onUserChanged`, `user=`, user);

      res(user);
    });
  });
}

let _initialized = false;
export function initializeFirebase() {
  log.d(`utils/firebaseUtils.js`, `initializeFirebase`, `_initialized=${_initialized}`);

  if (!_initialized) {
    log.d(`utils/firebaseUtils.js`, `firebase.initializeApp(config)`);
    let config = {
      apiKey: "AIzaSyAiZt3uJqSbvTphwgOdllefmKy2Qfs0ZiA",
      authDomain: "tilu-1c341.firebaseapp.com",
      databaseURL: "https://tilu-1c341.firebaseio.com",
      projectId: "tilu-1c341",
      storageBucket: "tilu-1c341.appspot.com",
      messagingSenderId: "25009930917"
    };
    firebase.initializeApp(config);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
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

    _initialized = true;
  }
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
