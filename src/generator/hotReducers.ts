import { combineReducers } from 'redux';
import type { Store, Reducer, ReducersMapObject } from 'redux';

const hotReducers = (store: Store, staticReducers?: ReducersMapObject) => {
  const reducersMap: ReducersMapObject = { ...staticReducers };

  const replaceReducers = () => {
    store.replaceReducer(combineReducers(reducersMap));
  };

  const injectReducer = (name: string, reducer: Reducer) => {
    reducersMap[name] = reducer;
    replaceReducers();
  };

  const ejectReducer = (name: string) => {
    delete reducersMap[name];
    replaceReducers();
  };

  return {
    injectReducer,
    ejectReducer,
  };
};

export { hotReducers };
