import type { AnyAction } from 'redux';
import type { Effect, TopicProps, Topic } from './types';
declare const ofType: (action: AnyAction, ...types: string[]) => boolean;
declare const createSwitchEffect: () => (name?: string) => (effect: Effect) => void | Promise<any>;
declare const createRunTopics: (topics: Topic[]) => () => (actionType: string, topicProps: TopicProps) => Promise<void>;
export { ofType, createSwitchEffect, createRunTopics };
