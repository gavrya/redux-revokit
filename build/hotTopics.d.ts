import type { createTopicMiddleware } from './topicMiddleware';
import type { Topic } from './types/topicMiddleware';
import type { Store } from 'redux';
declare const TOPIC_INJECTED = "@topicMiddleware/TOPIC_INJECTED";
declare const TOPIC_EJECTED = "@topicMiddleware/TOPIC_EJECTED";
declare const hotTopics: (store: Store, topicMiddleware: ReturnType<typeof createTopicMiddleware>) => {
    injectTopic: (name: string, topic: Topic) => void;
    ejectTopic: (name: string) => void;
};
export { hotTopics, TOPIC_INJECTED, TOPIC_EJECTED };
