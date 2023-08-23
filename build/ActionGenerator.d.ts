import type { ActionCreatorsMapObject } from 'redux';
import type { DataObject } from './types/actionGenerator';
declare const PROP = "prop";
declare const EVENT = "event";
declare const RESET = "reset";
declare class ActionGenerator<N extends string, S extends DataObject> {
    readonly namespace: N;
    readonly initialState: S;
    constructor(namespace: N, initialState: S);
    createPropAction<K extends keyof S & string, T extends `${N}/${typeof PROP}/${K}`, P = S[K]>(key: K): [T, (payload: P) => {
        type: T;
        payload: P;
    }];
    createEventAction<K extends string, T extends `${N}/${typeof EVENT}/${K}`>(key: K): [T, () => {
        type: T;
    }];
    createResetAction<K extends string, T extends `${N}/${typeof RESET}/${K}`>(key: K): [T, () => {
        type: T;
    }];
    createReducer<A extends {
        type: string;
        payload?: any;
    }>(): (state: S | undefined, action: A) => S;
    createHoc<A extends ActionCreatorsMapObject>(actionCreators: A): import("react-redux").InferableComponentEnhancerWithProps<{
        state: S;
    } & {
        actions: A;
    }, {}>;
    createHook<A extends ActionCreatorsMapObject>(actionCreators: A): () => {
        state: S;
    } & {
        actions: A;
    };
}
export { ActionGenerator };
