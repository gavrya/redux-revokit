import type { Action, AnyAction, Dispatch, Middleware } from 'redux';

type TopicProps<A extends Action = AnyAction, S = any> = {
  action: A;
  getState: () => S;
  dispatch: Dispatch;
};

interface Topic<A extends Action = AnyAction, S = any> {
  (props: TopicProps<A, S>): void | Promise<any>;
  inputTypes: string[];
}

type Effect = () => void | Promise<any>;

type MiddlewareRun = { run: (topics: Topic[]) => void };

type TopicMiddleware = Middleware & MiddlewareRun;

export type { TopicProps, Topic, Effect, TopicMiddleware };
