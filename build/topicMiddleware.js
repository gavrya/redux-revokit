var runTopic = function (props) { return function (topic) {
    return Promise.resolve(topic(props));
}; };
var combineTopics = function () {
    var topics = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        topics[_i] = arguments[_i];
    }
    return function (props) {
        return Promise.all(topics.map(runTopic(props)));
    };
};
var createFakeDispatch = function (topic, dispatch) { return function (action) {
    return topic.isEjected ? action : dispatch(action);
}; };
var createTopicMiddleware = function () {
    var rootTopic = null;
    var middleware = function (_a) {
        var dispatch = _a.dispatch, getState = _a.getState;
        return function (next) {
            return function (action) {
                next(action);
                if (rootTopic) {
                    var topicProps = {
                        action: action,
                        getState: getState,
                        dispatch: createFakeDispatch(rootTopic, dispatch),
                    };
                    runTopic(topicProps)(rootTopic);
                }
            };
        };
    };
    middleware.run = function (topic) {
        if (!topic) {
            throw new Error('Invalid root topic');
        }
        if (rootTopic) {
            rootTopic.isEjected = true;
        }
        rootTopic = topic;
    };
    return middleware;
};
export { runTopic, combineTopics, createFakeDispatch, createTopicMiddleware };
