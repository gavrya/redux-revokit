import type { AnyAction, Dispatch, Store } from 'redux';
type TopicProps = {
    action: AnyAction;
    dispatch: Dispatch;
    getState: Store['getState'];
};
type Topic = (props: TopicProps) => void | Promise<any>;
interface RootTopic extends Topic {
    isEjected?: boolean;
}
type Effect = () => void | Promise<any>;
type NextMiddleware = (action: unknown) => unknown;
export type { TopicProps, Topic, RootTopic, Effect, NextMiddleware };
