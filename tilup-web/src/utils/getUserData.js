export default function getUserData() {
  let data = {};
  const key = 'AIzaSyAiZt3uJqSbvTphwgOdllefmKy2Qfs0ZiA';
  data = JSON.parse(sessionStorage.getItem('firebase:authUser:'+key+':[DEFAULT]'));
  console.log("get user data >> ", data);
  return data;
}