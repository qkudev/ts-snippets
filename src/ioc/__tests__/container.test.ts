import Container from '../container';
import { asClass, asFunction, asValue } from '../registration';

type Registrations = {
  analytics: Analytics;
  config: Config;
  errorTracker: ErrorTracker;
};

type Config = {
  appName: string;
};

const config: Config = {
  appName: 'test',
};

const sendEvent = jest.fn();

class Analytics {
  constructor(public readonly deps: { config: Config }) {}

  public sendEvent(ev: string) {
    sendEvent(`[${this.deps.config.appName}] ${ev}`);
  }
}

const handleError = jest.fn();

class ErrorTracker {
  constructor(public readonly deps: { config: Config; analytics: Analytics }) {}

  public handleError(error: unknown) {
    handleError(`[${this.deps.config.appName}] ${String(error)}`);
  }
}

describe('Container', () => {
  let container = new Container<Registrations>();

  beforeEach(() => {
    container = new Container();
  });

  it('should be defined', () => {
    expect(container).toBeDefined();
    expect(container).toBeInstanceOf(Container);
  });

  it('should register and resolve as value', () => {
    container.register('config', asValue(config));

    expect(container.resolve('config')).toBe(config);
  });

  it('should register and resolve as function', () => {
    container.register('config', asValue(config));
    container.register(
      'errorTracker',
      asFunction((deps) => new ErrorTracker(deps))
    );

    const errorTracker = container.resolve('errorTracker');

    expect(errorTracker).toBeInstanceOf(ErrorTracker);

    errorTracker.handleError('error');
    expect(handleError).toHaveBeenCalledWith('[test] error');
  });

  it('should register by key as class', () => {
    container.register('config', asValue(config));
    container.register('analytics', asClass(Analytics));

    const analytics = container.resolve('analytics');
    expect(analytics).toBeInstanceOf(Analytics);

    analytics.sendEvent('request');
    expect(sendEvent).toHaveBeenCalledWith(`[test] request`);
  });

  it('should throw if unknown registration requested', () => {
    expect(() => container.resolve('test' as any)).toThrow(
      `Unknown registration test`
    );
  });

  it('should throw on set to container', () => {
    container.register(
      'analytics',
      asFunction((registrations) => {
        registrations['test' as any] = 42;

        return new Analytics(registrations);
      })
    );

    expect(() => container.resolve('analytics')).toThrow(
      'Can not set to container'
    );
  });
});
