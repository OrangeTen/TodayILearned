import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';

import * as types from './ActionTypes';
import { getInitializedApp } from "../utils/firebaseUtils";


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

    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        unsubscribe();
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
