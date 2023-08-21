import type { AnyAction } from 'redux';
import type { Effect } from './types/topicMiddleware';

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

export { hasOwnProp, ofType, createSwitchEffect };
