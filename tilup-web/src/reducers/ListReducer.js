import { FETCH_TILLIST_SUCCESS } from '../actions/ActionTypes';

const initialState = {
  tilList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TILLIST_SUCCESS:
      return { ...state, tilList: action.data };
    default:
      return state;
  }
}
