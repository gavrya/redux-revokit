import type { Topic, TopicMiddleware } from './types/topicMiddleware';
import type { Store } from 'redux';

const TOPIC_INJECTED = '@topicMiddleware/TOPIC_INJECTED';
const TOPIC_EJECTED = '@topicMiddleware/TOPIC_EJECTED';

const topicInjectedAction = () => ({ type: TOPIC_INJECTED });
const topicEjectedAction = () => ({ type: TOPIC_EJECTED });

const hotTopics = (store: Store, topicMiddleware: TopicMiddleware) => {
  const topicMap: Record<string, Topic[]> = {};
  let rootTopics: Topic[] | undefined;

  const replaceRootTopic = () => {
    if (rootTopics && rootTopics.length > 0) {
      store.dispatch(topicEjectedAction());
    }

    rootTopics = Object.values(topicMap).reduce(
      (all, topics) => [...all, ...topics],
      [],
    );

    topicMiddleware.run(rootTopics);

    if (rootTopics.length > 0) {
      store.dispatch(topicInjectedAction());
    }
  };

  const injectTopic = (name: string, topics: Topic[]) => {
    topicMap[name] = topics;
    replaceRootTopic();
  };

  const ejectTopic = (name: string) => {
    delete topicMap[name];
    replaceRootTopic();
  };

  return {
    injectTopic,
    ejectTopic,
  };
};

export { hotTopics, TOPIC_INJECTED, TOPIC_EJECTED };
