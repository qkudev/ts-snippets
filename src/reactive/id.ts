import { Reactive } from './types';
import { ID } from './utils';

let id = 1;

export const generateId = () => id++;

export const getId = <T>($var: Reactive<T>) => $var[ID];
