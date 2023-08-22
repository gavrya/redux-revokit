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
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import { hasOwnProp } from './utils';
var PROP = 'prop';
var EVENT = 'event';
var RESET = 'reset';
var ActionGenerator = /** @class */ (function () {
    function ActionGenerator(namespace, initialState) {
        this.namespace = namespace;
        this.initialState = initialState;
    }
    ActionGenerator.prototype.createPropAction = function (key) {
        var actionType = "".concat(this.namespace, "/").concat(PROP, "/").concat(key);
        var actionCreator = function (payload) { return ({
            type: actionType,
            payload: payload,
        }); };
        return [actionType, actionCreator];
    };
    ActionGenerator.prototype.createEventAction = function (key) {
        var actionType = "".concat(this.namespace, "/").concat(EVENT, "/").concat(key);
        var actionCreator = function () { return ({
            type: actionType,
        }); };
        return [actionType, actionCreator];
    };
    ActionGenerator.prototype.createResetAction = function (key) {
        var actionType = "".concat(this.namespace, "/").concat(RESET, "/").concat(key);
        var actionCreator = function () { return ({
            type: actionType,
        }); };
        return [actionType, actionCreator];
    };
    ActionGenerator.prototype.createReducer = function () {
        var _this = this;
        return function (state, action) {
            var _a;
            var segments = action.type.split('/');
            if (segments.length !== 3) {
                return state;
            }
            var namespace = segments[0], method = segments[1], key = segments[2];
            if (namespace !== _this.namespace) {
                return state;
            }
            if (method === PROP && hasOwnProp(state, key)) {
                return __assign(__assign({}, state), (_a = {}, _a[key] = action.payload, _a));
            }
            if (method === RESET) {
                return _this.initialState;
            }
            return state;
        };
    };
    ActionGenerator.prototype.createHoc = function (actionCreators) {
        var _this = this;
        var mapStateToProps = function (rootState) { return ({
            state: rootState[_this.namespace],
        }); };
        var mapDispatchToProps = function (dispatch) { return ({
            actions: bindActionCreators(actionCreators, dispatch),
        }); };
        return connect(mapStateToProps, mapDispatchToProps);
    };
    ActionGenerator.prototype.createHook = function (actionCreators) {
        var _this = this;
        return function () {
            var dispatch = useDispatch();
            var state = useSelector(function (rootState) { return rootState[_this.namespace]; });
            var actions = useMemo(function () { return bindActionCreators(actionCreators, dispatch); }, [actionCreators, dispatch]);
            return useMemo(function () { return ({
                state: state,
                actions: actions,
            }); }, [state, actions]);
        };
    };
    return ActionGenerator;
}());
export { ActionGenerator };
