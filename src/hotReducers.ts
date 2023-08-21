import { combineReducers } from 'redux';
import type { Store, Reducer, ReducersMapObject } from 'redux';
import { hasOwnProp } from './utils';

const hotReducers = (store: Store, staticReducers?: ReducersMapObject) => {
  const reducers: ReducersMapObject = { ...staticReducers };

  const replaceReducers = () => {
    store.replaceReducer(combineReducers(reducers));
  };

  const injectReducer = (name: string, reducer: Reducer) => {
    reducers[name] = reducer;
    replaceReducers();
  };

  const ejectReducer = (name: string) => {
    if (hasOwnProp(reducers, name)) {
      delete reducers[name];
      replaceReducers();
    }
  };

  return {
    injectReducer,
    ejectReducer,
  };
};

export { hotReducers };
