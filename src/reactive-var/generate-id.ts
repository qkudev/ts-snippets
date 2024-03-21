import { ReactiveVar } from './reactive-var.types';
import { ID } from './utils';

let id = 1;

const generateId = () => id++;

export const getId = <T>($var: ReactiveVar<T>) => $var[ID];

export default generateId;
