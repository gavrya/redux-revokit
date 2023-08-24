var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TOPIC_INJECTED = '@topicMiddleware/TOPIC_INJECTED';
var TOPIC_EJECTED = '@topicMiddleware/TOPIC_EJECTED';
var topicInjectedAction = function () { return ({ type: TOPIC_INJECTED }); };
var topicEjectedAction = function () { return ({ type: TOPIC_EJECTED }); };
var hotTopics = function (store, topicMiddleware) {
    var topicsMap = {};
    var rootTopics;
    var replaceRootTopic = function () {
        if (rootTopics && rootTopics.length > 0) {
            store.dispatch(topicEjectedAction());
        }
        rootTopics = Object.values(topicsMap).reduce(function (all, topics) { return __spreadArray(__spreadArray([], all, true), topics, true); }, []);
        topicMiddleware.run(rootTopics);
        if (rootTopics.length > 0) {
            store.dispatch(topicInjectedAction());
        }
    };
    var injectTopics = function (name, topics) {
        topicsMap[name] = topics;
        replaceRootTopic();
    };
    var ejectTopics = function (name) {
        delete topicsMap[name];
        replaceRootTopic();
    };
    return {
        injectTopics: injectTopics,
        ejectTopics: ejectTopics,
    };
};
export { hotTopics, TOPIC_INJECTED, TOPIC_EJECTED };
