import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers';


const createAppStore = compose(
	applyMiddleware(
		ReduxThunk,
    createLogger(),
  ),
	window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

export default function configureStore(initialState){
	return createAppStore(rootReducer, initialState);
}
