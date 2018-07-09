import * as log from "./log";

export default function getUserData() {
  let data = {};
  const key = 'AIzaSyAiZt3uJqSbvTphwgOdllefmKy2Qfs0ZiA';
  data = JSON.parse(sessionStorage.getItem('firebase:authUser:'+key+':[DEFAULT]'));
  log.d("actions/getUserData.js", "getUserData", "get user data >> ", data);
  return data;
}