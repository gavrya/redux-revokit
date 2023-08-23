import type { AnyAction, Dispatch } from 'redux';
import type { TopicMiddleware } from './types/topicMiddleware';
import { TopicRunner } from './TopicRunner';
declare const createFakeDispatch: (topicRunner: TopicRunner, dispatch: Dispatch) => (action: AnyAction) => AnyAction;
declare const createTopicMiddleware: () => TopicMiddleware;
export { createFakeDispatch, createTopicMiddleware };
