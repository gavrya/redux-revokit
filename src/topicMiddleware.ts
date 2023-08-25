import type { AnyAction, Dispatch } from 'redux';
import type { Topic, TopicMiddleware } from './types/topicMiddleware';
import { TopicsRunner } from './TopicsRunner';

const createFakeDispatch =
  (topicsRunner: TopicsRunner, dispatch: Dispatch) => (action: AnyAction) =>
    topicsRunner.isEjected() ? action : dispatch(action);

const createTopicMiddleware = () => {
  let topicsRunner: TopicsRunner | undefined;

  const middleware: TopicMiddleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action: AnyAction) => {
      next(action);

      if (topicsRunner) {
        const topicProps = {
          action,
          getState,
          dispatch: createFakeDispatch(topicsRunner, dispatch) as Dispatch,
        };

        topicsRunner.run(action.type, topicProps).catch((error) => {
          throw error;
        });
      }
    };

  middleware.run = (topics: Topic[]) => {
    if (topicsRunner) {
      topicsRunner.eject();
    }

    topicsRunner = new TopicsRunner(topics);
  };

  return middleware;
};

export { createFakeDispatch, createTopicMiddleware };
