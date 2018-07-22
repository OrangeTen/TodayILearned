import * as types from './ActionTypes';
import {
  getInitializedApp, getGithubProvider, getFacebookProvider
} from "../utils/firebaseUtils";


export const firebaseInitialize = () => {
  const firebaseApp = getInitializedApp();
  const auth = firebaseApp.auth();

  return dispatch => dispatch({
    type: types.FIREBASE_INITIALIZED_SUCCESS,
    data: {
      auth,
      githubProvider: getGithubProvider(),
      facebookProvider: getFacebookProvider(),
    },
  });
};

export const firebaseLoadSignedInUser = () => {
  return (dispatch, getState) => {
    const {
      firebase: {auth}
    } = getState();

    dispatch({
      type: types.FIREBASE_CHECK_PREVSIGNEDINUSER,
    });

    const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        dispatch({
          type: types.FIREBASE_CHECK_PREVSIGNEDINUSER_SUCCESS,
          data: {
            user,
          },
        });

        if (user) {
          dispatch(firebaseSubscribeIdToken());
        }
      }
    );
  }
};

export const firebasePopupGithubSignin = () => {
  return (dispatch, getState) => {
    const {
      firebase: { auth, githubProvider }
    } = getState();

    auth.signInWithPopup(githubProvider).then((result) => {
      dispatch({
        type: types.FIREBASE_GITHUBSIGNIN_SUCCESS,
        data: result,
      });
      dispatch(firebaseSubscribeIdToken());
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

export const firebasePopupFacebookSignin = () => {
  return (dispatch, getState) => {
    const {
      firebase: { auth, facebookProvider }
    } = getState();

    auth.signInWithPopup(facebookProvider).then((result) => {
      dispatch({
        type: types.FIREBASE_FACEBOOKSIGNIN_SUCCESS,
        data: result,
      });
      dispatch(firebaseSubscribeIdToken());
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
