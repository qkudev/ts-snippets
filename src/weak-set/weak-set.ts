export class WeakSet<T extends object = any> {
  private _key = Symbol('WeakSet');

  public add = (value: T) => {
    if (typeof value !== 'object' || value === null) {
      throw new TypeError(`Invalid key type: ${typeof value}`);
    }

    Object.defineProperty(value, this._key, {
      configurable: true,
      enumerable: false,
      value: true,
      writable: false,
    });
  };

  public has = (o: T) => {
    // @ts-ignore
    return !!o[this._key];
  };

  public delete = (o: T) => {
    // @ts-ignore
    delete o[this._key];
  };
}
