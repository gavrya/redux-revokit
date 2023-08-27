import type { Topic, TopicMiddleware } from './types';
import type { Store } from 'redux';
declare const TOPICS_INJECTED = "@topicMiddleware/TOPICS_INJECTED";
declare const TOPICS_EJECTED = "@topicMiddleware/TOPICS_EJECTED";
declare const topicsInjectedAction: () => {
    type: string;
};
declare const topicsEjectedAction: () => {
    type: string;
};
declare const hotTopics: (store: Store, topicMiddleware: TopicMiddleware) => {
    injectTopics: (name: string, topics: Topic[]) => void;
    ejectTopics: (name: string) => void;
};
export { hotTopics, TOPICS_INJECTED, TOPICS_EJECTED };
type TopicsInjectedAction = ReturnType<typeof topicsInjectedAction>;
type TopicsEjectedAction = ReturnType<typeof topicsEjectedAction>;
export type { TopicsInjectedAction, TopicsEjectedAction };
