import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();
export const middlewares = [thunk,sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;