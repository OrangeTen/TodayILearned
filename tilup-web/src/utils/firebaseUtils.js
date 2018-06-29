import * as firebase from "firebase";

let _initialized = false;
export function initializeFirebase() {
  if (!_initialized) {
    console.log("firebase initialize");
    let config = {
      apiKey: "AIzaSyAiZt3uJqSbvTphwgOdllefmKy2Qfs0ZiA",
      authDomain: "tilu-1c341.firebaseapp.com",
      databaseURL: "https://tilu-1c341.firebaseio.com",
      projectId: "tilu-1c341",
      storageBucket: "tilu-1c341.appspot.com",
      messagingSenderId: "25009930917"
    };
    firebase.initializeApp(config);
    _initialized = true;
  }
}

export function getFirebaseCurrentUser() {
  return firebase.auth().currentUser;
}

export function isSignedIn() {
  console.log(`firebase.auth().currentUser=${firebase.auth().currentUser}`);
  return firebase.auth().currentUser;
}
