import { applyMiddleware, createStore, combineReducers, compose } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import * as reducers from './ducks';

export default function getStore() {

const appReducer = combineReducers(reducers);
const middlewares = [thunk, promise];

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

if (process.env.NODE_ENV !== 'production') {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	middlewares.push(logger);
	return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}

 return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );

// const middleware = applyMiddleware(promise, thunk, createLogger())
}
