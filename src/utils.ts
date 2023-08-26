import type { AnyAction } from 'redux';
import type { Effect, TopicProps, Topic } from './types/topicMiddleware';
import { TopicRunner } from './TopicRunner';

const hasOwnProp = (object: Record<string, any>, prop: string): boolean =>
  Object.prototype.hasOwnProperty.call(object, prop);

const ofType = (action: AnyAction, ...types: string[]) =>
  types.includes(action.type);

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

const createRunTopics = (topics: Topic[]) => () => {
  const topicRunner = new TopicRunner(topics);

  return async (actionType: string, topicProps: TopicProps) => {
    await topicRunner.run(actionType, topicProps);
  };
};

export { hasOwnProp, ofType, createSwitchEffect, createRunTopics };
