var hasOwnProp = function (object, prop) {
    return Object.prototype.hasOwnProperty.call(object, prop);
};
var ofType = function (action) {
    var types = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
    }
    return types.includes(action.type);
};
var createSwitchEffect = function () {
    var callId = {};
    return function (name) {
        if (name === void 0) { name = 'default'; }
        var newCallId = {};
        callId[name] = newCallId;
        return function (effect) {
            if (newCallId === callId[name]) {
                return effect();
            }
        };
    };
};
export { hasOwnProp, ofType, createSwitchEffect };
