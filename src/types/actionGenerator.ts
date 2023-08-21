type DataObject = Record<string, any>;

type ObjectValuesUnion<T extends DataObject> = T[keyof T];

type ActionsFromActionCreators<T extends DataObject> = {
  [K in keyof T as Capitalize<Extract<K, string>>]: ReturnType<T[K]>;
};

export type { DataObject, ObjectValuesUnion, ActionsFromActionCreators };
