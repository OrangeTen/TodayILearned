import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';

import * as types from './ActionTypes';
import { getInitializedApp } from "../utils/firebaseUtils";
import * as log from "../utils/log";


export const firebaseInitialize = () => {
  const firebaseApp = getInitializedApp();

  return dispatch => dispatch({
    type: types.FIREBASE_INITIALIZED_SUCCESS,
    data: {
      firebaseApp,
      githubProvider: new firebase.auth.GithubAuthProvider(),
    },
  });
};

export const firebaseLoadSignedInUser = () => {
  return dispatch => {
    dispatch({
      type: types.FIREBASE_LOAD_SIGNEDINUSER,
    });

    let isFirstAuthStateChanged = true;
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (!isFirstAuthStateChanged) {
          log.d("actions/firebase.js", "firebaseLoadSignedInUser", "!isFirstAuthStateChanged");
          return;
        }

        isFirstAuthStateChanged = false;
        dispatch({
          type: types.FIREBASE_LOAD_SIGNEDINUSER_SUCCESS,
          data: {
            user,
          },
        });
      }
    );
  }
};
