import * as types from "../actions/ActionTypes";


const initialState = {
  auth: null,
  githubProvider: null,
  facebookProvider: null,
  user: null,
  isNewUser: false,
  newUserInfo: null,
  token: null,
  isSigningOut: false,
  hasPrevSignedinUserChecked: false,
  idtokenUnsubscribe: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FIREBASE_INITIALIZED_SUCCESS:
      return {
        ...state,
        auth: action.data.auth,
        githubProvider: action.data.githubProvider,
        facebookProvider: action.data.facebookProvider,
      };

    case types.FIREBASE_CHECK_PREVSIGNEDINUSER:
      return {
        ...state,
        hasPrevSignedinUserChecked: false,
      };

    case types.FIREBASE_CHECK_PREVSIGNEDINUSER_SUCCESS:
      const user = action.data.user;
      let token = null;

      if (user) {
        token = action.data.user.h.b;
      }

      return {
        ...state,
        hasPrevSignedinUserChecked: true,
        user: user,
        token: token,
      };

    case types.FIREBASE_GITHUBSIGNIN_SUCCESS:
      let isNewGhUser = action.data.additionalUserInfo.isNewUser;
      let newGhUserInfo = {};
      if (isNewGhUser) {
        const account = action.data.additionalUserInfo.profile.login;
        const name = action.data.additionalUserInfo.profile.name;
        newGhUserInfo.account = account;
        newGhUserInfo.name = name;
      }

      return {
        ...state,
        user: action.data.user,
        token: action.data.user.h.b,
        isNewUser: isNewGhUser,
        newUserInfo: newGhUserInfo,
      };

    case types.FIREBASE_FACEBOOKSIGNIN_SUCCESS:
      let isNewFbUser = action.data.additionalUserInfo.isNewUser;
      let newFbUserInfo = {};
      if (isNewFbUser) {
        const account = action.data.additionalUserInfo.profile.email ||
          action.data.additionalUserInfo.profile.id;
        const name = action.data.additionalUserInfo.profile.name;
        newFbUserInfo.account = account;
        newFbUserInfo.name = name;
      }

      return {
        ...state,
        user: action.data.user,
        token: action.data.user.h.b,
        isNewUser: isNewFbUser,
        newUserInfo: newFbUserInfo,
      };

    case types.FIREBASE_SIGNOUT:
      return {
        ...state,
        isSigningOut: true,
      };

    case types.FIREBASE_SIGNOUT_SUCCESS:
      return {
        ...state,
        isSigningOut: false,
        user: null,
        token: null,
      };

    case types.FIREBASE_SUBSCRIBE_IDTOKEN:
      return {
        ...state,
        idtokenUnsubscribe: action.data.unsubscribe,
      };

    case types.FIREBASE_IDTOKEN_UPDATED:
      return {
        ...state,
        token: action.data.token,
      };

    default:
      return state;
  }
}
