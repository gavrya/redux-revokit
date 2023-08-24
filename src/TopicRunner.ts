import type { Topic, TopicProps } from './types/topicMiddleware';

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
    const topics = this.topicsMap.get(actionType);

    if (!topics) {
      return Promise.resolve();
    }

    const promises = topics.map((topic) => Promise.resolve(topic(topicProps)));

    return Promise.all(promises).then(() => Promise.resolve());
  }

  private register(topics: Topic[]) {
    topics.forEach((topic) => {
      if (!topic.inputTypes) {
        // eslint-disable-next-line no-console
        console.warn('Topic must have "inputTypes" property');
        return;
      }

      topic.inputTypes.forEach((inputType) => {
        const oldTopics = this.topicsMap.get(inputType);
        const newTopics = oldTopics ? [...oldTopics, topic] : [topic];

        this.topicsMap.set(inputType, newTopics);
      });
    });
  }
}

export { TopicRunner };
