import type { AnyAction, Dispatch } from 'redux';
import type {
  TopicProps,
  Topic,
  RootTopic,
  TopicMiddleware,
} from './types/topicMiddleware';

const runTopic = (props: TopicProps) => (topic: Topic) =>
  Promise.resolve(topic(props));

const combineTopics =
  (...topics: Topic[]) =>
  (props: TopicProps) =>
    Promise.all(topics.map(runTopic(props)));

const createFakeDispatch =
  (topic: RootTopic, dispatch: Dispatch) => (action: AnyAction) =>
    topic.isEjected ? action : dispatch(action);

const createTopicMiddleware = () => {
  let rootTopic: RootTopic | null = null;

  const middleware: TopicMiddleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action: AnyAction) => {
      next(action);

      if (rootTopic) {
        const topicProps = {
          action,
          getState,
          dispatch: createFakeDispatch(rootTopic, dispatch) as Dispatch,
        };

        runTopic(topicProps)(rootTopic);
      }
    };

  middleware.run = (topic: Topic) => {
    if (!topic) {
      throw new Error('Invalid root topic');
    }

    if (rootTopic) {
      rootTopic.isEjected = true;
    }

    rootTopic = topic;
  };

  return middleware;
};

export { runTopic, combineTopics, createFakeDispatch, createTopicMiddleware };
