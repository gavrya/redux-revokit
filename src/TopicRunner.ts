import type { Topic, TopicProps } from './types/topicMiddleware';

class TopicRunner {
  private topicMap = new Map<string, Topic[]>();

  constructor(topics: Topic[]) {
    this.register(topics);
  }

  isEjected() {
    return this.topicMap.size === 0;
  }

  eject() {
    this.topicMap.clear();
  }

  async run(actionType: string, topicProps: TopicProps) {
    const topics = this.topicMap.get(actionType);

    if (!topics) {
      return;
    }

    const promises = topics.map((topic) => Promise.resolve(topic(topicProps)));

    return Promise.all(promises);
  }

  private register(topics: Topic[]) {
    topics.forEach((topic) => {
      topic.inputTypes.forEach((inputType) => {
        const oldTopics = this.topicMap.get(inputType);
        const newTopics = oldTopics ? [...oldTopics, topic] : [topic];

        this.topicMap.set(inputType, newTopics);
      });
    });
  }
}

export { TopicRunner };
