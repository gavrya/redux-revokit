import type { AnyAction, Dispatch, Store, Middleware } from 'redux';
type TopicProps = {
    action: AnyAction;
    dispatch: Dispatch;
    getState: Store['getState'];
};
type Topic = (props: TopicProps) => void | Promise<any>;
type RootTopic = Topic & {
    isEjected?: boolean;
};
type Effect = () => void | Promise<any>;
type RunTopic = {
    run: (topic: Topic) => void;
};
type TopicMiddleware = Middleware & RunTopic;
export type { TopicProps, Topic, RootTopic, Effect, TopicMiddleware };
