import * as types from "../actions/ActionTypes";


const initialState = {
  tilList: [],
  contents: "",
  isCreating: false,
  directory: "Inbox",
  isPrivate: false,
  hashes: [],
  directorieList: [
    { text: "Inbox" },
    { text: "JavaScript" },
    { text: "Interview Questions" },
  ]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TILLIST_SUCCESS:
      return {
        ...state,
        tilList: action.data
      };

    case types.TIL_CONTENTS_CHANGED:
      return {
        ...state,
        contents: action.data.contents,
      };

    case types.TIL_CREATE:
      return {
        ...state,
        isCreating: true,
      };

    case types.TIL_CREATE_SUCCESS:
      return {
        ...state,
        tilList: [
          action.data.data,
          ...state.tilList,
          ],
        contents: "",
        isCreating: false,
      };

    case types.TIL_CREATE_FAILURE:
      return {
        ...state,
        isCreating: false,
      };

    default:
      return state;
  }
}
