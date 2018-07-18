import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

// import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import * as FirebaseUtils from "./utils/firebaseUtils";
import * as log from "./utils/log";
import './index.css';
import Root from './Root';

const store = configureStore();

log.d(`index.js`);
FirebaseUtils.initializeFirebase();

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
