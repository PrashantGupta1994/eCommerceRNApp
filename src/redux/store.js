import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

let store = null;
const thunkMiddleware = applyMiddleware(thunk);

export const configureStore = () => {
  store = createStore(reducer, thunkMiddleware);
  return store;
};
