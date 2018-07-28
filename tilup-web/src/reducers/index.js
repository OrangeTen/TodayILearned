import { combineReducers } from 'redux';

import FirebaseReducer from "./FirebaseReducer";
import UserReducer from "./UserReducer";
import TilReducer from "./TilReducer";
import DirectoryReducer from "./DirectoryReducer";
import SearchReducer from "./SearchReducer";


const rootReducer = combineReducers({
  firebase: FirebaseReducer,
  user: UserReducer,
  til: TilReducer,
  directory: DirectoryReducer,
  search: SearchReducer,
});

export default rootReducer;
