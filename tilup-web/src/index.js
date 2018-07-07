import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import * as FirebaseUtils from "./utils/firebaseUtils";
import * as log from "./utils/log";
import './index.css';
import Root from './Root';


log.d(`index.js`);
FirebaseUtils.initializeFirebase();

ReactDOM.render(<Root />, document.getElementById('root'));
// registerServiceWorker();
