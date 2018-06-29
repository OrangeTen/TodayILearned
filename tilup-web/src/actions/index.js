import axiosMock from '../utils/axiosMock';

export function getTilList() {
  return axiosMock.get('/api/feed/');
}