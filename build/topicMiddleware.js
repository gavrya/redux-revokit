import { TopicRunner } from './TopicRunner';
var createFakeDispatch = function (topicRunner, dispatch) { return function (action) {
    return topicRunner.isEjected() ? action : dispatch(action);
}; };
var createTopicMiddleware = function () {
    var topicRunner;
    var middleware = function (_a) {
        var dispatch = _a.dispatch, getState = _a.getState;
        return function (next) {
            return function (action) {
                next(action);
                if (topicRunner) {
                    var topicProps = {
                        action: action,
                        getState: getState,
                        dispatch: createFakeDispatch(topicRunner, dispatch),
                    };
                    topicRunner.run(action.type, topicProps).catch(function (error) {
                        throw error;
                    });
                }
            };
        };
    };
    middleware.run = function (topics) {
        if (topicRunner) {
            topicRunner.eject();
        }
        topicRunner = new TopicRunner(topics);
    };
    return middleware;
};
export { createFakeDispatch, createTopicMiddleware };
