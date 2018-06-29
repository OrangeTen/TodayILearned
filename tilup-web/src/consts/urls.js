let host;
if (process.env.NODE_ENV === 'production') {
  host = "/";
} else {
  host = "http://tilup.sullivan.kr:3000/";
}

export const API_HOST = host;
