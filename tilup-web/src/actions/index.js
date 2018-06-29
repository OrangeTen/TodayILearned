import axios from "axios";
import {API_HOST} from "../consts/urls";


export function getTilList() {
  let targetUrl = API_HOST + "api/feed/";
  console.log(`targetUrl=${targetUrl}`);
  return axios.get(targetUrl);
}