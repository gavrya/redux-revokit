# redux-revokit
redux-revokit

## ActionGenerator usage example

```ts
import { ActionGenerator } from 'redux-revokit';
import type { ActionsFromActionCreators, ObjectValuesUnion } from 'redux-revokit';

const namespace = '@search';

type InitialState = {
  isLoaded: boolean;
  items: string[];
};

const initialState: InitialState = {
  isLoaded: false,
  items: [],
};

const regen = new ActionGenerator<typeof namespace, InitialState>(
  namespace,
  initialState,
);

// PROP
const [IS_LOADED, isLoadedPropAction] = regen.createPropAction('isLoaded');
const [ITEMS, itemsPropAction] = regen.createPropAction('items');

// EVENT
const [ITEMS_LOADED, itemsLoadedEventAction] =
  regen.createEventAction('itemsLoaded');

// RESET
const [RESET, resetAction] = regen.createResetAction('reset');

const types = {
  IS_LOADED,
  ITEMS,
  ITEMS_LOADED,
  RESET,
};

const actions = {
  isLoadedPropAction,
  itemsPropAction,
  itemsLoadedEventAction,
  resetAction,
};

const reducer = regen.createReducer();
const usePropsHook = regen.createHook(actions);
const withPropsHoc = regen.createHoc(actions);

export {
  namespace,
  initialState,
  types,
  actions,
  reducer,
  usePropsHook,
  withPropsHoc,
};

type ActionCreators = typeof actions;
type Actions = ActionsFromActionCreators<ActionCreators>;
type SomeAction = ObjectValuesUnion<Actions>;
type SomeActionCreator = ObjectValuesUnion<ActionCreators>;

export type {
  InitialState,
  Actions,
  SomeAction,
  ActionCreators,
  SomeActionCreator,
};
```
