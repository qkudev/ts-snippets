import EventEmitter from '../EventEmitter';

const event = 'test-event';

describe('EventEmitter', () => {
  let emitter: EventEmitter;
  beforeEach(() => {
    emitter = new EventEmitter();
  });

  it('should initialize', () => {
    expect(emitter).toBeInstanceOf(EventEmitter);
  });

  it('should add listener', () => {
    const listener = jest.fn();
    emitter.addListener(event, listener);
    emitter.emit(event, 'testArg');
    emitter.emit('otherEvent');

    expect(listener).toHaveBeenCalledWith('testArg');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe listener', () => {
    const listener = jest.fn();
    const unsubscribe = emitter.addListener(event, listener);
    unsubscribe();

    emitter.emit(event);
    expect(listener).toHaveBeenCalledTimes(0);
  });

  it('should remove listener', () => {
    const listener = jest.fn();
    emitter.addListener(event, listener);
    emitter.removeListener(event, listener);
    emitter.emit(event, 'testArg');
    expect(listener).toHaveBeenCalledTimes(0);
  });

  it('should emit event to listener only once', () => {
    const listener = jest.fn();
    emitter.once(event, listener);
    emitter.emit(event, 'testArg');
    emitter.emit(event, 'otherArg');
    expect(listener).toHaveBeenCalledWith('testArg');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should remove all listeners', () => {
    const listener1 = jest.fn();
    emitter.addListener('event1', listener1);
    const listener2 = jest.fn();
    emitter.addListener('event2', listener2);
    emitter.removeAllListeners();

    expect(listener1).toHaveBeenCalledTimes(0);
    expect(listener2).toHaveBeenCalledTimes(0);
  });

  it('should return currently available event names', () => {
    emitter.addListener('event1', jest.fn());
    emitter.addListener('event2', jest.fn());
    expect(emitter.eventNames).toEqual(['event1', 'event2']);
  });
});
