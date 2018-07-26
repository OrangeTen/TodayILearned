import * as types from "../actions/ActionTypes";


const initialState = {
  directoryList: [],
  isFetchingList: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DIRECTORYLIST:
      return {
        ...state,
        isFetchingList: true,
      };

    case types.FETCH_DIRECTORYLIST_SUCCESS:
      return {
        ...state,
        directoryList: action.data,
        isFetchingList: false,
      };

    case types.FETCH_DIRECTORYLIST_FAILURE:
      return {
        ...state,
        isFetchingList: false,
      };

    default:
      return state;
  }
}
