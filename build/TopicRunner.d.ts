import type { Topic, TopicProps } from './types/topicMiddleware';
declare class TopicRunner {
    private topicsMap;
    constructor(topics: Topic[]);
    isEjected(): boolean;
    eject(): void;
    run(actionType: string, topicProps: TopicProps): Promise<any[] | undefined>;
    private register;
}
export { TopicRunner };
