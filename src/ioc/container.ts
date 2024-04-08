import { Registration } from './registration';

type Key = string | number | symbol;

/**
 * Dependency injection container implementation
 */
class Container<Config extends Record<string, any>> {
  private registrations = new Map<
    Key,
    Registration<Config, Config[keyof Config]>
  >();

  private entities = new Map<Key, Config[keyof Config]>();

  private proxy = new Proxy({} as Config, {
    get: (_, prop) => {
      const key = prop as keyof Config;

      if (!this.registrations.has(key)) {
        throw new Error(`Unknown registration ${String(key)}`);
      }

      if (!this.entities.has(key)) {
        const registration = this.registrations.get(key);
        const entity = registration.construct(this.proxy);
        this.entities.set(key, entity);
      }

      return this.entities.get(key);
    },
    set: () => {
      throw new Error('Can not set to container');
    },
  });

  public register<K extends keyof Config>(
    key: K,
    registration: Registration<Config, Config[typeof key]>
  ) {
    this.registrations.set(key, registration);
  }

  public resolve<K extends keyof Config>(key: K): Config[typeof key] {
    if (!this.registrations.has(key)) {
      throw new Error(`Unknown registration ${String(key)}`);
    }

    return this.proxy[key];
  }
}

export default Container;
