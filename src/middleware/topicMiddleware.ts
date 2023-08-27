import type { AnyAction, Dispatch } from 'redux';
import type { Topic, TopicMiddleware } from './types';
import { TopicRunner } from './TopicRunner';

const createFakeDispatch =
  (topicRunner: TopicRunner, dispatch: Dispatch) => (action: AnyAction) =>
    topicRunner.isEjected() ? action : dispatch(action);

const createTopicMiddleware = () => {
  let topicRunner: TopicRunner | undefined;

  const middleware: TopicMiddleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action: AnyAction) => {
      next(action);

      if (topicRunner) {
        const topicProps = {
          action,
          getState,
          dispatch: createFakeDispatch(topicRunner, dispatch) as Dispatch,
        };

        topicRunner.run(action.type, topicProps).catch((error) => {
          throw error;
        });
      }
    };

  middleware.run = (topics: Topic[]) => {
    if (topicRunner) {
      topicRunner.eject();
    }

    topicRunner = new TopicRunner(topics);
  };

  return middleware;
};

export { createTopicMiddleware };
