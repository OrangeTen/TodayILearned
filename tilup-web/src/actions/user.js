import axios from "axios";
import * as types from './ActionTypes';
import { API_HOST } from "../consts/urls";
import { getHeadersWithToken } from "./index";


export const signin = () => {
  return (dispatch, getState) => {
    const {
      firebase: {
        token
      }
    } = getState();
    dispatch({
      type: types.USER_SIGNIN,
    });

    const url = API_HOST + 'api/login/';
    const headers = getHeadersWithToken(token);

    return axios.get(url, headers)
      .then(_ => {
        dispatch({
          type: types.USER_SIGNIN_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.USER_SIGNIN_FAILURE,
          data: {
            err
          },
        });
      });
  }
};
