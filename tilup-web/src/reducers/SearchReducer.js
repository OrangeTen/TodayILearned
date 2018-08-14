import * as types from "../actions/ActionTypes";


const initialState = {
  results: [],
  isSearching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_TIL:
      return {
        ...state,
        isSearching: true,
      };

    case types.SEARCH_TIL_SUCCESS:
      return {
        ...state,
        results: action.data,
        isSearching: false,
      };

    case types.SEARCH_TIL_FAILURE:
      return {
        ...state,
        isSearching: false,
      };

    default:
      return state;
  }
}
