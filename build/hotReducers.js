var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { combineReducers } from 'redux';
import { hasOwnProp } from './utils';
var hotReducers = function (store, staticReducers) {
    var reducers = __assign({}, staticReducers);
    var replaceReducers = function () {
        store.replaceReducer(combineReducers(reducers));
    };
    var injectReducer = function (name, reducer) {
        reducers[name] = reducer;
        replaceReducers();
    };
    var ejectReducer = function (name) {
        if (hasOwnProp(reducers, name)) {
            delete reducers[name];
            replaceReducers();
        }
    };
    return {
        injectReducer: injectReducer,
        ejectReducer: ejectReducer,
    };
};
export { hotReducers };
