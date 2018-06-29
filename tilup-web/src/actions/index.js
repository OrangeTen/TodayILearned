import axiosMock from '../utils/axiosMock';

export function getTilList() {
  return axiosMock.get('/api/feed/');
}

export function getUserData() {
  return '';
  //return axiosMock.get('/api/user/:uid');
}