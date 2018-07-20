import { combineReducers } from 'redux';

import ListReducer from './ListReducer';
import FirebaseReducer from "./FirebaseReducer";


const rootReducer = combineReducers({
  lists: ListReducer,
  firebase: FirebaseReducer,
});

export default rootReducer;
