import axios from "axios/index";

import * as types from "./ActionTypes";
import { API_HOST } from "../consts/urls";
import { getOptionWithAuthHeadersFromGetState } from "./index";


export const fetchDirectoryListRequest = () => {
  return { type: types.FETCH_DIRECTORYLIST };
};

export const fetchDirectoryListSuccess = json => {
  return {
    type: types.FETCH_DIRECTORYLIST_SUCCESS,
    data: json
  };
};

export const fetchDirectoryListFailure = json => {
  return {
    type: types.FETCH_DIRECTORYLIST_FAILURE,
    data: json
  };
};

export const fetchDirectoryList = () => {
  return (dispatch, getState) => {
    const url = `${API_HOST}api/directory/`;
    const options = getOptionWithAuthHeadersFromGetState(getState);

    dispatch(fetchDirectoryListRequest());
    return axios.get(url, options)
      .then(response => {
        dispatch(fetchDirectoryListSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchDirectoryListFailure(err));
      })
  };
};
