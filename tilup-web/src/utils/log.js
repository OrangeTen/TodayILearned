
export function d(path, context, ...msg) {
  if (process.env.NODE_ENV !== 'production') {
    _d(path, context, ...msg);
  }
}

function _d(path, context, ...msg) {
  let prefix = "Log.d";
  if (msg && msg.length > 0) {
    console.log(prefix, path, context, ...msg);
  } else if (context) {
    console.log(prefix, path, context);
  } else {
    console.log(prefix, path);
  }
}
