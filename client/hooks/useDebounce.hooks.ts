import { useEffect } from 'react';
import { useTimeout } from './useTimeout.hooks';

export const useDebounce = <T>(callback: () => void, delay: number, dependencies: T[]) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};
