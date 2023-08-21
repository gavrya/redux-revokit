import type { Store, AnyAction, Dispatch } from 'redux';
import type {
  TopicProps,
  Topic,
  RootTopic,
  Effect,
  NextMiddleware,
} from './types/topicMiddleware';

const ofType = (action: AnyAction, ...types: string[]) =>
  types.includes(action.type);

const runTopic = (props: TopicProps) => (topic: Topic) =>
  Promise.resolve(topic(props));

const combineTopics =
  (...topics: Topic[]) =>
  (props: TopicProps) =>
    Promise.all(topics.map(runTopic(props)));

const createFakeDispatch =
  (topic: RootTopic, dispatch: Dispatch) => (action: AnyAction) => {
    if (!topic.isEjected) {
      dispatch(action);
    }
  };

const createTopicMiddleware = () => {
  let rootTopic: RootTopic | null = null;

  const middleware =
    ({
      dispatch,
      getState,
    }: {
      dispatch: Dispatch;
      getState: Store['getState'];
    }) =>
    (next: NextMiddleware) =>
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

const createSwitchEffect = () => {
  const callId: Record<string, any> = {};

  return (name = 'default') => {
    const newCallId = {};

    callId[name] = newCallId;

    return (effect: Effect) => {
      if (newCallId === callId[name]) {
        return effect();
      }
    };
  };
};

export {
  ofType,
  runTopic,
  combineTopics,
  createFakeDispatch,
  createTopicMiddleware,
  createSwitchEffect,
};
