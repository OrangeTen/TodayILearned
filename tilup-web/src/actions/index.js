import axios from "axios";

import {API_HOST} from "../consts/urls";
import * as log from "../utils/log";
import * as FirebaseUtils from "../utils/firebaseUtils";
import * as types from "./ActionTypes";


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
  const url = `${API_HOST}api/feed/`;
  // const url = "https://jsonplaceholder.typicode.com/posts/1" // example api
	return dispatch => {
		dispatch(fetchTilListRequest());
		return axios.get(url, option)
			.then(response => {
				dispatch(fetchTilListSuccess(response.data));
			})
			.catch(response => {
				dispatch(fetchTilListError(response.data));
			})
	};
};


// ----------- TODO: 2018/07/18 @milooy: Delete below this line after apply redux:

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

export function getRepoListWithUid(uid) {
  log.d(`actions/index.js`, `getRepoListWithUid`);

  let targetUrl = `${API_HOST}api/directory/${uid}`;
  // header에 Authorization: idToken
  return axios.get(targetUrl);
}

export function getUserData(uid) {
  log.d(`actions/index.js`, `getUserData`);

  let targetUrl = `${API_HOST}api/user/${uid}`;
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
