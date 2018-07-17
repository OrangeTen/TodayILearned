import { combineReducers } from 'redux';
import ListReducer from './ListReducer';

const rootReducer = combineReducers({
  lists: ListReducer,
});
export default rootReducer;
