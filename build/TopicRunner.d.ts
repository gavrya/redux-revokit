import type { Topic, TopicProps } from './types/topicMiddleware';
declare class TopicRunner {
    private topicsMap;
    constructor(topics: Topic[]);
    isEjected(): boolean;
    eject(): void;
    run(actionType: string, topicProps: TopicProps): Promise<void>;
    private register;
    private registerTopic;
}
export { TopicRunner };
