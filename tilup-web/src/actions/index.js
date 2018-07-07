import axios from "axios";
import {API_HOST} from "../consts/urls";
import * as log from "../utils/log";


export function getTilList(query) {
  log.d(`actions/index.js`, `getTilList`);

  let targetUrl = API_HOST + "api/feed/";
  if(query) {
    targetUrl = API_HOST + `api/search/${query}`;
  } 
  console.log(`targetUrl=${targetUrl}`);
  return axios.get(targetUrl);
}

export function getOneTil(idx) {
  log.d(`actions/index.js`, `getOneTil`);

  let targetUrl = API_HOST + "api/til/"+idx;
  console.log(`targetUrl=${targetUrl}`);
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
  return axios.post(targetUrl, params.body, params.header).then(res => {
      console.log("SubmitTil Result >> ", res);
    });
}