import EventEmitter from '../event-emitter';
import { Id } from './types';

type EventName = 'seal' | 'unseal' | 'set' | `change/${number}`;

export const bus = new EventEmitter<EventName>();

export const changeEvent = (id: Id) => `change/${id}` satisfies EventName;
