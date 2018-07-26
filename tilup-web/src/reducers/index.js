import { combineReducers } from 'redux';

import FirebaseReducer from "./FirebaseReducer";
import UserReducer from "./UserReducer";
import TilReducer from "./TilReducer";


const rootReducer = combineReducers({
  firebase: FirebaseReducer,
  user: UserReducer,
  til: TilReducer,
});

export default rootReducer;
