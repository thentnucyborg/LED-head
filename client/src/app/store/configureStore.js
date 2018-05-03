import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const logger = createLogger({
  predicate: (getState, action) => (action.type !== 'SET_GRID'),
  collapsed: true,
});

const middleware = [thunk, logger];

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

export default store;
