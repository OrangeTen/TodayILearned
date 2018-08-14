import * as types from './ActionTypes';
import {
  getInitializedApp, getGithubProvider, getFacebookProvider
} from "../utils/firebaseUtils";
import { signin } from "./user";
import * as log from "../utils/log";


export const firebaseInitialize = () => {
  const firebaseApp = getInitializedApp();
  const auth = firebaseApp.auth();

  return dispatch => {
    dispatch({
      type: types.FIREBASE_INITIALIZE,
      data: {
        auth,
        githubProvider: getGithubProvider(),
        facebookProvider: getFacebookProvider(),
      },
    });

    return dispatch(firebaseLoadSignedInUser())
      .then(() => {
      }).catch((err) => {
        log.d("actions/firebase.js", "firebaseInitialize", err);
      }).then(() => {
        return dispatch({
          type: types.FIREBASE_INITIALIZE_SUCCESS,
        });
      });
  }
};

export const firebaseLoadSignedInUser = () => {
  return (dispatch, getState) => {
    const {
      firebase: { auth }
    } = getState();

    dispatch({
      type: types.FIREBASE_CHECK_PREVSIGNEDINUSER,
    });

    return new Promise((res, _) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        if (user) {
          const token = user.h.b;
          dispatch(firebaseSigninSuccess(user, token))
            .then(() => {
              res();
            });
        }

        res();
      })
    }).then(() => {
      dispatch({
        type: types.FIREBASE_CHECK_PREVSIGNEDINUSER_SUCCESS,
      });
    });
  }
};

export const firebasePopupGithubSignin = () => {
  return (dispatch, getState) => {
    const {
      firebase: { auth, githubProvider }
    } = getState();

    auth.signInWithPopup(githubProvider).then((result) => {
      const user = result.user;
      const token = result.user.h.b;

      dispatch(firebaseSigninSuccess(user, token));
    }).catch((err) => {
      dispatch({
        type: types.FIREBASE_GITHUBSIGNIN_FAILURE,
        data: {
          err,
        },
      });
    });
  }
};

export const firebaseSigninSuccess = (user, token) => {
  return dispatch => {
    dispatch({
      type: types.FIREBASE_SIGNIN_SUCCESS,
      data: {
        user,
        token,
      },
    });

    dispatch(firebaseSubscribeIdToken());
    return dispatch(signin());
  }
};

export const firebasePopupFacebookSignin = () => {
  return (dispatch, getState) => {
    const {
      firebase: { auth, facebookProvider }
    } = getState();

    auth.signInWithPopup(facebookProvider).then((result) => {
      const isNewFbUser = result.additionalUserInfo.isNewUser;

      if (isNewFbUser) {
        const account = result.additionalUserInfo.profile.email ||
          result.additionalUserInfo.profile.id;
        const name = result.additionalUserInfo.profile.name;

        dispatch(firebaseSignup(account, name));
      }

      const user = result.user;
      const token = result.user.h.b;

      dispatch(firebaseSigninSuccess(user, token));
    }).catch((err) => {
      dispatch({
        type: types.FIREBASE_FACEBOOKSIGNIN_FAILURE,
        data: {
          err,
        },
      });
    });
  }
};

export const firebaseSignup = (account, name) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.FIREBASE_SIGNUP
    });

    // todo 180725 jyp Implementation
  }
};

export const firebaseSignout = () => {
  return (dispatch, getState) => {
    const {
      firebase: { auth }
    } = getState();

    dispatch({
      type: types.FIREBASE_SIGNOUT
    });

    auth.signOut()
      .then(() => {
        dispatch({
          type: types.FIREBASE_SIGNOUT_SUCCESS
        });
        dispatch(firebaseUnsubscribeIdToken());
      });
  }
};

export const firebaseSubscribeIdToken = () => {
  return (dispatch, getState) => {
    const {
      firebase: { auth }
    } = getState();

    const unsubscribe = auth.onAuthStateChanged(user => {
      user.getIdToken()
        .then(token => dispatch({
          type: types.FIREBASE_IDTOKEN_UPDATED,
          data: {
            token
          },
        }));
    });

    dispatch({
      type: types.FIREBASE_SUBSCRIBE_IDTOKEN,
      data: {
        unsubscribe
      },
    });
  }
};

export const firebaseUnsubscribeIdToken = () => {
  return (dispatch, getState) => {
    const {
      firebase: { idtokenUnsubscribe }
    } = getState();

    idtokenUnsubscribe();
    dispatch({
      type: types.FIREBASE_UNSUBSCRIBE_IDTOKEN,
    });
  }
};
