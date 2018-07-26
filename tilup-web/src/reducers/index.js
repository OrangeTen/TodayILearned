import { combineReducers } from 'redux';

import ListReducer from './ListReducer';
import FirebaseReducer from "./FirebaseReducer";
import UserReducer from "./UserReducer";
import TilReducer from "./TilReducer";


const rootReducer = combineReducers({
  lists: ListReducer,
  firebase: FirebaseReducer,
  user: UserReducer,
  til: TilReducer,
});

export default rootReducer;
