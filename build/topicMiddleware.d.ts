import type { AnyAction, Dispatch } from 'redux';
import type { TopicProps, Topic, RootTopic, TopicMiddleware } from './types/topicMiddleware';
declare const runTopic: (props: TopicProps) => (topic: Topic) => Promise<any>;
declare const combineTopics: (...topics: Topic[]) => (props: TopicProps) => Promise<any[]>;
declare const createFakeDispatch: (topic: RootTopic, dispatch: Dispatch) => (action: AnyAction) => AnyAction;
declare const createTopicMiddleware: () => TopicMiddleware;
export { runTopic, combineTopics, createFakeDispatch, createTopicMiddleware };
