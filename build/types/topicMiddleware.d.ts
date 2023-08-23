import type { Action, AnyAction, Dispatch, Middleware } from 'redux';
type TopicProps<A extends Action = AnyAction, S = any> = {
    action: A;
    getState: () => S;
    dispatch: Dispatch;
};
type Topic<A extends Action = AnyAction, S = any> = (props: TopicProps<A, S>) => void | Promise<any>;
type RootTopic = Topic & {
    isEjected?: boolean;
};
type Effect = () => void | Promise<any>;
type MiddlewareRun = {
    run: (topic: Topic) => void;
};
type TopicMiddleware = Middleware & MiddlewareRun;
export type { TopicProps, Topic, RootTopic, Effect, TopicMiddleware };
