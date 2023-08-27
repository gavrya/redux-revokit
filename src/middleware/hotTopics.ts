import type { Topic, TopicMiddleware } from './types';
import type { Store } from 'redux';

const TOPICS_INJECTED = '@topicMiddleware/TOPICS_INJECTED';
const TOPICS_EJECTED = '@topicMiddleware/TOPICS_EJECTED';

const topicsInjectedAction = () => ({ type: TOPICS_INJECTED });
const topicsEjectedAction = () => ({ type: TOPICS_EJECTED });

const hotTopics = (store: Store, topicMiddleware: TopicMiddleware) => {
  const topicsMap: Record<string, Topic[]> = {};
  let rootTopics: Topic[] | undefined;

  const replaceRootTopic = () => {
    if (rootTopics && rootTopics.length > 0) {
      store.dispatch(topicsEjectedAction());
    }

    rootTopics = Object.values(topicsMap).reduce(
      (all, topics) => [...all, ...topics],
      [],
    );

    topicMiddleware.run(rootTopics);

    if (rootTopics.length > 0) {
      store.dispatch(topicsInjectedAction());
    }
  };

  const injectTopics = (name: string, topics: Topic[]) => {
    topicsMap[name] = topics;
    replaceRootTopic();
  };

  const ejectTopics = (name: string) => {
    delete topicsMap[name];
    replaceRootTopic();
  };

  return {
    injectTopics,
    ejectTopics,
  };
};

export { hotTopics, TOPICS_INJECTED, TOPICS_EJECTED };

type TopicsInjectedAction = ReturnType<typeof topicsInjectedAction>;
type TopicsEjectedAction = ReturnType<typeof topicsEjectedAction>;

export type { TopicsInjectedAction, TopicsEjectedAction };
