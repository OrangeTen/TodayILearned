// import * as log from "../utils/log";

let withSlash = (host) => {
  if (!host) {
    return "/";
  }

  if (!host.endsWith("/")) {
    return host + "/";
  }

  return host;
};

let getHost = () => {
  // log.d(`consts/urls.js`, `getHost`, `process.env.REACT_APP_API_HOST=${process.env.REACT_APP_API_HOST}`);
  // log.d(`consts/urls.js`, `getHost`, `!process.env.REACT_APP_API_HOST=${!process.env.REACT_APP_API_HOST}`);
  if (!process.env.REACT_APP_API_HOST) {
    return "/";
  } else {
    return process.env.REACT_APP_API_HOST;
  }
};

export const API_HOST = withSlash(getHost());
