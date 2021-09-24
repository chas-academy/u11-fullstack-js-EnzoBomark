import { useEffect } from 'react';
import { useDidMountEffect } from './useDidMountEffect.hooks';
import { useTimeout } from './useTimeout.hooks';

export const useDebounce = <T>(callback: () => void, delay: number, dependencies: T[]) => {
  const { reset, clear } = useTimeout(callback, delay);
  useDidMountEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};
