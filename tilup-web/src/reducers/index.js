import { combineReducers } from 'redux';

import FirebaseReducer from "./FirebaseReducer";
import UserReducer from "./UserReducer";
import TilReducer from "./TilReducer";
import DirectoryReducer from "./DirectoryReducer";


const rootReducer = combineReducers({
  firebase: FirebaseReducer,
  user: UserReducer,
  til: TilReducer,
  directory: DirectoryReducer,
});

export default rootReducer;
