import { NextAppContext } from 'next/app';
import { Action, Store } from 'redux';

export const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

declare global {
  type Maybe<T> = T | null | undefined;

  // helper type for nullable values that's more strict than `Maybe`.
  // use this in scenarios where you'd like to rely on explict null checks.
  // (you might does this to avoid boolean casting, which yields a performance
  // benefit in critical situations).
  type Nullable<T> = T | null;

  type ImmutableRecord<K extends string, V> = Readonly<Record<K, V>>;
}

export { };