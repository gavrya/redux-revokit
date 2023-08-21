import type { Store, AnyAction, Dispatch } from 'redux';
import type { TopicProps, Topic, RootTopic, Effect, NextMiddleware } from './types/topicMiddleware';
declare const ofType: (action: AnyAction, ...types: string[]) => boolean;
declare const runTopic: (props: TopicProps) => (topic: Topic) => Promise<any>;
declare const combineTopics: (...topics: Topic[]) => (props: TopicProps) => Promise<any[]>;
declare const createFakeDispatch: (topic: RootTopic, dispatch: Dispatch) => (action: AnyAction) => void;
declare const createTopicMiddleware: () => {
    ({ dispatch, getState, }: {
        dispatch: Dispatch;
        getState: Store['getState'];
    }): (next: NextMiddleware) => (action: AnyAction) => void;
    run(topic: Topic): void;
};
declare const createSwitchEffect: () => (name?: string) => (effect: Effect) => void | Promise<any>;
export { ofType, runTopic, combineTopics, createFakeDispatch, createTopicMiddleware, createSwitchEffect, };
