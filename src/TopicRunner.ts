import type { Topic, TopicProps } from './types/topicMiddleware';

const ANY_ACTION_TYPE = '*/*/*';

class TopicRunner {
  private topicsMap = new Map<string, Topic[]>();

  constructor(topics: Topic[]) {
    this.registerTopics(topics);
  }

  isEjected() {
    return this.topicsMap.size === 0;
  }

  eject() {
    this.topicsMap.clear();
  }

  async run(actionType: string, topicProps: TopicProps) {
    const topicsByActionType = this.topicsMap.get(actionType) || [];
    const topicsByAnyActionType = this.topicsMap.get(ANY_ACTION_TYPE) || [];
    const topics = [...topicsByActionType, ...topicsByAnyActionType];

    if (topics.length === 0) {
      return;
    }

    const promises = topics.map((topic) => Promise.resolve(topic(topicProps)));

    await Promise.all(promises);
  }

  private registerTopics(topics: Topic[]) {
    topics.forEach((topic) => {
      const actionTypes = topic.inputActionTypes || [ANY_ACTION_TYPE];

      actionTypes.forEach((actionType) => {
        const addedTopics = this.topicsMap.get(actionType) || [];

        this.topicsMap.set(actionType, [...addedTopics, topic]);
      });
    });
  }
}

export { TopicRunner };
