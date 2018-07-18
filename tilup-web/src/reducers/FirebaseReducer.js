import {
  FIREBASE_LOAD_SIGNEDINUSER,
  FIREBASE_LOAD_SIGNEDINUSER_SUCCESS,
  FIREBASE_INITIALIZED_SUCCESS,
} from '../actions/ActionTypes';

const initialState = {
  firebaseApp: null,
  githubProvider: null,
  user: null,
  isFetchingSignedinUser: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FIREBASE_INITIALIZED_SUCCESS:
      return {
        ...state,
        firebaseApp: action.data.firebaseApp,
        githubProvider: action.data.githubProvider,
      };

    case FIREBASE_LOAD_SIGNEDINUSER:
      return {
        ...state,
        isFetchingSignedinUser: true,
      };

    case FIREBASE_LOAD_SIGNEDINUSER_SUCCESS:
      return {
        ...state,
        isFetchingSignedinUser: false,
        user: action.data.user,
      };

    default:
      return state;
  }
}
