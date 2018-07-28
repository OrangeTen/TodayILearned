import axios from "axios/index";

import * as types from "./ActionTypes";
import { API_HOST } from "../consts/urls";
import { getOptionWithAuthHeadersFromGetState } from "./index";


export const searchTilRequest = () => {
  return { type: types.SEARCH_TIL };
};

export const searchTilSuccess = json => {
  return {
    type: types.SEARCH_TIL_SUCCESS,
    data: json
  };
};

export const searchTilFailure = err => {
  return {
    type: types.SEARCH_TIL_FAILURE,
    data: {
      err
    }
  };
};

export const searchTil = query => {
  return (dispatch, getState) => {
    const url = `${API_HOST}api/search/${query}`;
    const options = getOptionWithAuthHeadersFromGetState(getState);

    dispatch(searchTilRequest());
    return axios.get(url, options)
      .then(response => {
        dispatch(searchTilSuccess(response.data));
      })
      .catch(err => {
        dispatch(searchTilFailure(err));
      })
  };
};
