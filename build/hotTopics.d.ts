import type { Topic, TopicMiddleware } from './types/topicMiddleware';
import type { Store } from 'redux';
declare const TOPICS_INJECTED = "@topicMiddleware/TOPICS_INJECTED";
declare const TOPICS_EJECTED = "@topicMiddleware/TOPICS_EJECTED";
declare const hotTopics: (store: Store, topicMiddleware: TopicMiddleware) => {
    injectTopics: (name: string, topics: Topic[]) => void;
    ejectTopics: (name: string) => void;
};
export { hotTopics, TOPICS_INJECTED, TOPICS_EJECTED };
