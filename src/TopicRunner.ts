import type { Topic, TopicProps } from './types/topicMiddleware';

const ANY_ACTION_TYPE = '___ANY_ACTION_TYPE___';

class TopicRunner {
  private topicsMap = new Map<string, Topic[]>();

  constructor(topics: Topic[]) {
    this.register(topics);
  }

  isEjected() {
    return this.topicsMap.size === 0;
  }

  eject() {
    this.topicsMap.clear();
  }

  run(actionType: string, topicProps: TopicProps): Promise<void> {
    const topicsByActionType = this.topicsMap.get(actionType) || [];
    const topicsByAnyActionType = this.topicsMap.get(ANY_ACTION_TYPE) || [];
    const topics = [...topicsByActionType, ...topicsByAnyActionType];

    if (topics.length === 0) {
      return Promise.resolve();
    }

    const promises = topics.map((topic) => Promise.resolve(topic(topicProps)));

    return Promise.all(promises).then(() => Promise.resolve());
  }

  private register(topics: Topic[]) {
    topics.forEach((topic) => {
      const actionTypes = topic.inputActionTypes || [ANY_ACTION_TYPE];

      actionTypes.forEach((actionType) => {
        this.registerTopic(actionType, topic);
      });
    });
  }

  private registerTopic(actionType: string, topic: Topic) {
    const existedTopics = this.topicsMap.get(actionType);
    const topics = existedTopics ? [...existedTopics, topic] : [topic];

    this.topicsMap.set(actionType, topics);
  }
}

export { TopicRunner };
