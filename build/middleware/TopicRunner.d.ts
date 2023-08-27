import type { Topic, TopicProps } from './types';
declare class TopicRunner {
    private topicsMap;
    constructor(topics: Topic[]);
    isEjected(): boolean;
    eject(): void;
    run(actionType: string, topicProps: TopicProps): Promise<void>;
    private registerTopics;
}
export { TopicRunner };
