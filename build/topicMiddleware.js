import { TopicsRunner } from './TopicsRunner';
var createFakeDispatch = function (topicsRunner, dispatch) { return function (action) {
    return topicsRunner.isEjected() ? action : dispatch(action);
}; };
var createTopicMiddleware = function () {
    var topicsRunner;
    var middleware = function (_a) {
        var dispatch = _a.dispatch, getState = _a.getState;
        return function (next) {
            return function (action) {
                next(action);
                if (topicsRunner) {
                    var topicProps = {
                        action: action,
                        getState: getState,
                        dispatch: createFakeDispatch(topicsRunner, dispatch),
                    };
                    topicsRunner.run(action.type, topicProps).catch(function (error) {
                        throw error;
                    });
                }
            };
        };
    };
    middleware.run = function (topics) {
        if (topicsRunner) {
            topicsRunner.eject();
        }
        topicsRunner = new TopicsRunner(topics);
    };
    return middleware;
};
export { createFakeDispatch, createTopicMiddleware };
