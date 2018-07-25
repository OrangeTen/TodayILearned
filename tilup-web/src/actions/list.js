import axios from "axios/index";

import * as types from "./ActionTypes";
import { API_HOST } from "../consts/urls";
import { getHeadersWithToken } from "./index";


export const fetchTilListRequest = () => {
  return { type: types.FETCH_TILLIST };
};

export const fetchTilListSuccess = json => {
  return {
    type: types.FETCH_TILLIST_SUCCESS,
    data: json
  };
};

export const fetchTilListError = json => {
  return {
    type: types.FETCH_TILLIST_ERROR,
    data: json
  };
};

export const fetchTilList = (option) => {
  return (dispatch, getState) => {
    const {
      firebase: {
        token: token
      }
    } = getState();
    const url = `${API_HOST}api/feed/`;
    const headers = getHeadersWithToken(token);

    dispatch(fetchTilListRequest());
    return axios.get(url, Object.assign(headers, option))
      .then(response => {
        dispatch(fetchTilListSuccess(response.data));
      })
      .catch(response => {
        dispatch(fetchTilListError(response.data));
      })
  };
};
