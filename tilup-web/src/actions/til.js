import axios from "axios/index";

import * as types from "./ActionTypes";
import { API_HOST } from "../consts/urls";
import { getOptionWithAuthHeadersFromGetState } from "./index";


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
    const url = `${API_HOST}api/feed/`;
    const options = getOptionWithAuthHeadersFromGetState(getState);

    dispatch(fetchTilListRequest());
    return axios.get(url, Object.assign(options, option))
      .then(response => {
        dispatch(fetchTilListSuccess(response.data));
      })
      .catch(response => {
        dispatch(fetchTilListError(response.data));
      })
  };
};

export const onTilContentsChanged = contents => {
  return {
    type: types.TIL_CONTENTS_CHANGED,
    data: {
      contents
    }
  }
};

export const createTil = (contents, directory,
                          isPrivate, hashes) => {
  return (dispatch, getState) => {
    const url = `${API_HOST}api/til/`;
    const options = getOptionWithAuthHeadersFromGetState(getState);

    const data = {
      contents: contents,
      directory: directory,
      isPrivate: isPrivate,
      hash: hashes,
    };

    dispatch({
      type: types.TIL_CREATE
    });

    return axios.post(url, data, options)
      .then(response => {
        dispatch({
          type: types.TIL_CREATE_SUCCESS,
          data: response,
        });
      })
      .catch(err => {
        dispatch({
          type: types.TIL_CREATE_FAILURE,
          data: {
            err
          },
        });
      })
  };
};
