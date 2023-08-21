const hasOwnProp = (object: Record<string, any>, prop: string): boolean =>
  Object.prototype.hasOwnProperty.call(object, prop);

export { hasOwnProp };
