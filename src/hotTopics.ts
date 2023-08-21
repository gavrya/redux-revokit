import type { createTopicMiddleware } from './topicMiddleware';
import { combineTopics } from './topicMiddleware';
import type { Topic } from './types/topicMiddleware';
import type { Store } from 'redux';

const TOPIC_INJECTED = '@topicMiddleware/TOPIC_INJECTED';
const TOPIC_EJECTED = '@topicMiddleware/TOPIC_EJECTED';

const topicInjectedAction = () => ({ type: TOPIC_INJECTED });
const topicEjectedAction = () => ({ type: TOPIC_EJECTED });

const hotTopics = (
  store: Store,
  topicMiddleware: ReturnType<typeof createTopicMiddleware>,
) => {
  const topics: Record<string, Topic> = {};
  let rootTopic: Topic | null = null;

  const replaceRootTopic = () => {
    if (rootTopic) {
      store.dispatch(topicEjectedAction());
    }

    const newTopics = Object.values(topics);
    rootTopic = combineTopics(...newTopics);

    topicMiddleware.run(rootTopic);

    if (newTopics.length > 0) {
      store.dispatch(topicInjectedAction());
    }
  };

  const injectTopic = (name: string, topic: Topic) => {
    topics[name] = topic;
    replaceRootTopic();
  };

  const ejectTopic = (name: string) => {
    delete topics[name];
    replaceRootTopic();
  };

  return {
    injectTopic,
    ejectTopic,
  };
};

export { hotTopics, TOPIC_INJECTED, TOPIC_EJECTED };
