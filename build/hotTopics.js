var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TOPICS_INJECTED = '@topicMiddleware/TOPICS_INJECTED';
var TOPICS_EJECTED = '@topicMiddleware/TOPICS_EJECTED';
var topicsInjectedAction = function () { return ({ type: TOPICS_INJECTED }); };
var topicsEjectedAction = function () { return ({ type: TOPICS_EJECTED }); };
var hotTopics = function (store, topicMiddleware) {
    var topicsMap = {};
    var rootTopics;
    var replaceRootTopic = function () {
        if (rootTopics && rootTopics.length > 0) {
            store.dispatch(topicsEjectedAction());
        }
        rootTopics = Object.values(topicsMap).reduce(function (all, topics) { return __spreadArray(__spreadArray([], all, true), topics, true); }, []);
        topicMiddleware.run(rootTopics);
        if (rootTopics.length > 0) {
            store.dispatch(topicsInjectedAction());
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
export { hotTopics, TOPICS_INJECTED, TOPICS_EJECTED };
