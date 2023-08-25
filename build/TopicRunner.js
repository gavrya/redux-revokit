var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ANY_ACTION_TYPE = '*';
var TopicRunner = /** @class */ (function () {
    function TopicRunner(topics) {
        this.topicsMap = new Map();
        this.registerTopics(topics);
    }
    TopicRunner.prototype.isEjected = function () {
        return this.topicsMap.size === 0;
    };
    TopicRunner.prototype.eject = function () {
        this.topicsMap.clear();
    };
    TopicRunner.prototype.run = function (actionType, topicProps) {
        var topicsByActionType = this.topicsMap.get(actionType) || [];
        var topicsByAnyActionType = this.topicsMap.get(ANY_ACTION_TYPE) || [];
        var topics = __spreadArray(__spreadArray([], topicsByActionType, true), topicsByAnyActionType, true);
        if (topics.length === 0) {
            return Promise.resolve();
        }
        var promises = topics.map(function (topic) { return Promise.resolve(topic(topicProps)); });
        return Promise.all(promises).then(function () { return Promise.resolve(); });
    };
    TopicRunner.prototype.registerTopics = function (topics) {
        var _this = this;
        topics.forEach(function (topic) {
            var actionTypes = topic.inputActionTypes || [ANY_ACTION_TYPE];
            actionTypes.forEach(function (actionType) {
                var addedTopics = _this.topicsMap.get(actionType) || [];
                _this.topicsMap.set(actionType, __spreadArray(__spreadArray([], addedTopics, true), [topic], false));
            });
        });
    };
    return TopicRunner;
}());
export { TopicRunner };
