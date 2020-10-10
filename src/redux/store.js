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


 return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );

// const middleware = applyMiddleware(promise, thunk, createLogger())
}
