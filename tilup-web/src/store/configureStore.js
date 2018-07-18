import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import ReduxThunk from 'redux-thunk';

const createAppStore = compose(
	applyMiddleware(ReduxThunk)
)(createStore);

export default function configureStore(initialState){
	const store = createAppStore(rootReducer, initialState);
	return store;
}
