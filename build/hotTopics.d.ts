import type { Topic, TopicMiddleware } from './types/topicMiddleware';
import type { Store } from 'redux';
declare const TOPIC_INJECTED = "@topicMiddleware/TOPIC_INJECTED";
declare const TOPIC_EJECTED = "@topicMiddleware/TOPIC_EJECTED";
declare const hotTopics: (store: Store, topicMiddleware: TopicMiddleware) => {
    injectTopics: (name: string, topics: Topic[]) => void;
    ejectTopics: (name: string) => void;
};
export { hotTopics, TOPIC_INJECTED, TOPIC_EJECTED };
