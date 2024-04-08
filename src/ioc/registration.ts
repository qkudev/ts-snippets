export class Registration<Config, T> {
  constructor(
    public readonly construct: (config: Config) => T,
    public readonly type: 'value' | 'function' | 'class'
  ) {}
}

export const asValue = <Config, T>(value: T): Registration<Config, T> =>
  new Registration(() => value, 'value');

export const asFunction = <Config, T>(
  func: (config: Config) => T
): Registration<Config, T> => new Registration(func, 'function');

type Constructor<Config, T> = {
  new (config: Config): T;
};

export const asClass = <Config, T>(
  Constructor: Constructor<Config, T>
): Registration<Config, T> =>
  new Registration((config: Config) => new Constructor(config), 'class');
