import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

// import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import './index.css';
import Root from './Root';
import { firebaseInitialize, firebaseLoadSignedInUser } from "./actions/firebase";


const store = configureStore();
store.dispatch(firebaseInitialize());
store.dispatch(firebaseLoadSignedInUser());

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
