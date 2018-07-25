import { combineReducers } from 'redux';

import ListReducer from './ListReducer';
import FirebaseReducer from "./FirebaseReducer";
import UserReducer from "./UserReducer";


const rootReducer = combineReducers({
  lists: ListReducer,
  firebase: FirebaseReducer,
  user: UserReducer,
});

export default rootReducer;
