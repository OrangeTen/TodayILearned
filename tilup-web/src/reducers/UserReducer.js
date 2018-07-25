import * as types from "../actions/ActionTypes";


const initialState = {
  isSigningIn: false,
  userInfo: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.USER_SIGNIN:
      return {
        ...state,
        isSigningIn: true,
      };

    case types.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        isSigningIn: false,
      };

    case types.USER_SIGNIN_FAILURE:
      return {
        ...state,
        isSigningIn: false,
      };

    default:
      return state;
  }
}
