import * as firebase from "firebase";

let _initialized = false;
export function initializeFirebase() {
  if (!_initialized) {
    let config = {
      apiKey: "AIzaSyAiZt3uJqSbvTphwgOdllefmKy2Qfs0ZiA",
      authDomain: "tilu-1c341.firebaseapp.com",
      databaseURL: "https://tilu-1c341.firebaseio.com",
      projectId: "tilu-1c341",
      storageBucket: "tilu-1c341.appspot.com",
      messagingSenderId: "25009930917"
    };
    firebase.initializeApp(config);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        console.log("persistent setted");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });


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
