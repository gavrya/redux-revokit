import { combineTopics } from './topicMiddleware';
var TOPIC_INJECTED = '@topicMiddleware/TOPIC_INJECTED';
var TOPIC_EJECTED = '@topicMiddleware/TOPIC_EJECTED';
var topicInjectedAction = function () { return ({ type: TOPIC_INJECTED }); };
var topicEjectedAction = function () { return ({ type: TOPIC_EJECTED }); };
var hotTopics = function (store, topicMiddleware) {
    var topics = {};
    var rootTopic = null;
    var replaceRootTopic = function () {
        if (rootTopic) {
            store.dispatch(topicEjectedAction());
        }
        rootTopic = combineTopics.apply(void 0, Object.values(topics));
        topicMiddleware.run(rootTopic);
        if (Object.keys(topics).length > 0) {
            store.dispatch(topicInjectedAction());
        }
    };
    var injectTopic = function (name, topic) {
        topics[name] = topic;
        replaceRootTopic();
    };
    var ejectTopic = function (name) {
        delete topics[name];
        replaceRootTopic();
    };
    return {
        injectTopic: injectTopic,
        ejectTopic: ejectTopic,
    };
};
export { hotTopics, TOPIC_INJECTED, TOPIC_EJECTED };
