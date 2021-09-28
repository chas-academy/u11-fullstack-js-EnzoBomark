import { useEffect } from 'react';
import { useMount } from './useMount';
import { useTimeout } from './useTimeout.hooks';

export const useDebounce = <T>(callback: () => void, delay: number, dependencies: T[]) => {
  const { reset, clear } = useTimeout(callback, delay);
  useMount(reset, [...dependencies, reset]);
  useEffect(clear, []);
};
