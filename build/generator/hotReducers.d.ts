import type { Store, Reducer, ReducersMapObject } from 'redux';
declare const hotReducers: (store: Store, staticReducers?: ReducersMapObject) => {
    injectReducer: (name: string, reducer: Reducer) => void;
    ejectReducer: (name: string) => void;
};
export { hotReducers };
