import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import type { Dispatch, ActionCreatorsMapObject } from 'redux';
import type { DataObject } from './types/actionGenerator';
import { hasOwnProp } from './utils';

const PROP = 'prop';
const EVENT = 'event';
const RESET = 'reset';

class ActionGenerator<N extends string, S extends DataObject> {
  constructor(
    readonly namespace: N,
    readonly initialState: S,
  ) {}

  createPropAction<
    K extends keyof S & string,
    T extends `${N}/${typeof PROP}/${K}`,
    P = S[K],
  >(key: K): [T, (payload: P) => { type: T; payload: P }] {
    const actionType = `${this.namespace}/${PROP}/${key}` as T;

    const actionCreator = (payload: P) => ({
      type: actionType,
      payload,
    });

    return [actionType, actionCreator];
  }

  createEventAction<K extends string, T extends `${N}/${typeof EVENT}/${K}`>(
    key: K,
  ): [T, () => { type: T }] {
    const actionType = `${this.namespace}/${EVENT}/${key}` as T;

    const actionCreator = () => ({
      type: actionType,
    });

    return [actionType, actionCreator];
  }

  createResetAction<K extends string, T extends `${N}/${typeof RESET}/${K}`>(
    key: K,
  ): [T, () => { type: T }] {
    const actionType = `${this.namespace}/${RESET}/${key}` as T;

    const actionCreator = () => ({
      type: actionType,
    });

    return [actionType, actionCreator];
  }

  createReducer<A extends { type: string; payload?: any }>() {
    return (state: S, action: A) => {
      const segments = action.type.split('/');

      if (segments.length !== 3) {
        return state;
      }

      const [namespace, method, key] = segments;

      if (namespace !== this.namespace) {
        return state;
      }

      if (method === PROP && hasOwnProp(state, key)) {
        return {
          ...state,
          [key]: action.payload as keyof S,
        };
      }

      if (method === RESET) {
        return this.initialState;
      }

      return state;
    };
  }

  createHoc<A extends ActionCreatorsMapObject>(actionCreators: A) {
    const mapStateToProps = (rootState: DataObject) => ({
      state: rootState[this.namespace] as S,
    });

    const mapDispatchToProps = (dispatch: Dispatch) => ({
      actions: bindActionCreators(actionCreators, dispatch),
    });

    return connect(mapStateToProps, mapDispatchToProps);
  }

  createHook<A extends ActionCreatorsMapObject>(actionCreators: A) {
    return () => {
      const dispatch = useDispatch();

      const state = useSelector<DataObject>(
        (rootState) => rootState[this.namespace],
      ) as S;

      const actions = useMemo(
        () => bindActionCreators(actionCreators, dispatch),
        [actionCreators, dispatch],
      );

      return useMemo<{ state: S } & { actions: A }>(
        () => ({
          state,
          actions,
        }),
        [state, actions],
      );
    };
  }
}

export { ActionGenerator };
