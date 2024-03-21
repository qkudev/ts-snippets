import EventEmitter from '../event-emitter';

export const bus = new EventEmitter();

export const setEvent = (id: number) => `set/${id}`;
