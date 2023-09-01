export class WeakMap<O extends object, V> {
  private key = Symbol('WeakMap');

  public set = (key: O, v: V) => {
    Object.defineProperty(key, this.key, {
      configurable: true,
      enumerable: false,
      value: v,
      writable: false,
    });
  };

  public has = (o: O) => this.key in o;

  public get = (o: O) => {
    if (this.key in o) {
      return (o as any)[this.key] as V;
    }

    return undefined;
  };

  public delete = (o: O) => {
    // @ts-ignore
    delete o[this.key];
  };
}
