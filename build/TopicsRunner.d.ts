import type { Topic, TopicProps } from './types/topicMiddleware';
declare class TopicsRunner {
    private topicsMap;
    constructor(topics: Topic[]);
    isEjected(): boolean;
    eject(): void;
    run(actionType: string, topicProps: TopicProps): Promise<void>;
    private registerTopics;
}
export { TopicsRunner };
