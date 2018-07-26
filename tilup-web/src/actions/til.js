import axios from "axios/index";

import * as types from "./ActionTypes";
import { API_HOST } from "../consts/urls";
import { getOptionWithAuthHeadersFromGetState } from "./index";


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
