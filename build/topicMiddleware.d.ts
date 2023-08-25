import type { AnyAction, Dispatch } from 'redux';
import type { TopicMiddleware } from './types/topicMiddleware';
import { TopicsRunner } from './TopicsRunner';
declare const createFakeDispatch: (topicsRunner: TopicsRunner, dispatch: Dispatch) => (action: AnyAction) => AnyAction;
declare const createTopicMiddleware: () => TopicMiddleware;
export { createFakeDispatch, createTopicMiddleware };
