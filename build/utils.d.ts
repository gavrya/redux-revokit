import type { AnyAction } from 'redux';
import type { Effect, TopicProps, Topic } from './types/topicMiddleware';
declare const hasOwnProp: (object: Record<string, any>, prop: string) => boolean;
declare const ofType: (action: AnyAction, ...types: string[]) => boolean;
declare const createSwitchEffect: () => (name?: string) => (effect: Effect) => void | Promise<any>;
declare const createRunTopics: (topics: Topic[]) => () => (actionType: string, topicProps: TopicProps) => Promise<void>;
export { hasOwnProp, ofType, createSwitchEffect, createRunTopics };
