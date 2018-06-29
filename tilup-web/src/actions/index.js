import axios from "axios";
import {API_HOST} from "../consts/urls";


export function getTilList() {
  let targetUrl = API_HOST + "api/feed/";
  console.log(`targetUrl=${targetUrl}`);
  return axios.get(targetUrl);
}

export function getOneTil(idx) {
  let targetUrl = API_HOST + "api/til/"+idx;
  console.log(`targetUrl=${targetUrl}`);
  return axios.get(targetUrl);
}

export function getRepoListWithUid(uid) {
  let targetUrl = `${API_HOST}api/directory/${uid}`;
  // header에 Authorization: idToken
  return axios.get(targetUrl);
}

export function getUserData(uid) {
  let targetUrl = `${API_HOST}api/user/${uid}`;
  return axios.get(targetUrl);
}