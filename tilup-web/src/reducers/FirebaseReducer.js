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
  isInitialized: false,
  idtokenUnsubscribe: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FIREBASE_INITIALIZE:
      return {
        ...state,
        auth: action.data.auth,
        githubProvider: action.data.githubProvider,
        facebookProvider: action.data.facebookProvider,
      };

    case types.FIREBASE_INITIALIZE_SUCCESS:
      return {
        ...state,
        isInitialized: true,
      };

    case types.FIREBASE_SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.data.user,
        token: action.data.token,
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
