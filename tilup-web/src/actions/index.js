import axios from "axios";

import { API_HOST } from "../consts/urls";
import * as log from "../utils/log";
import * as FirebaseUtils from "../utils/firebaseUtils";


export function getOptionWithAuthHeadersFromGetState(getState) {
  const {
    firebase: {
      token: token
    }
  } = getState();

  const option = {
    headers: {
      authorization: token
    }
  };
  return option;
}

export function getHeadersWithToken(token) {
  return {
    headers: {
      authorization: token
    }
  };
}

export function getTilList(query) {
  log.d(`actions/index.js`, `getTilList`);

  let targetUrl = API_HOST + "api/feed/";

  return _getHeader()
    .then((header) => {
      if (query) {
        targetUrl = API_HOST + `api/search/${query}`;
      }
      log.d(`actions/index.js`, `getTilList`, `targetUrl=${targetUrl}`);

      return axios.get(targetUrl, header);
    });
}

export function getOneTil(idx) {
  log.d(`actions/index.js`, `getOneTil`);

  let targetUrl = API_HOST + "api/til/"+idx;

  log.d(`actions/index.js`, `getOneTil`, `targetUrl=${targetUrl}`);
  return axios.get(targetUrl);
}

export function postTil(params) {
  log.d(`actions/index.js`, `postTil`);

  let targetUrl = `${API_HOST}api/til`;

  return _getHeader()
    .then((header) => {
      return axios.post(targetUrl, params.body, {
        headers: header
      })
        .then(res => {
          log.d(`actions/index.js`, `postTil`, 'SubmitTil Result >> ', res);
        });
    })
}

function _getHeader() {
  return new Promise((res, rej) => {
    FirebaseUtils.getToken()
      .then(token => {
        let header = {
          authorization: token
        };

        log.d(`actions/index.js`, `_getHeader`, 'header=', header);

        res(header);
      });
  });
}
