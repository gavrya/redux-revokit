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
var hotReducers = function (store, staticReducers) {
    var reducersMap = __assign({}, staticReducers);
    var replaceReducers = function () {
        store.replaceReducer(combineReducers(reducersMap));
    };
    var injectReducer = function (name, reducer) {
        reducersMap[name] = reducer;
        replaceReducers();
    };
    var ejectReducer = function (name) {
        delete reducersMap[name];
        replaceReducers();
    };
    return {
        injectReducer: injectReducer,
        ejectReducer: ejectReducer,
    };
};
export { hotReducers };
