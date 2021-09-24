import { useEffect, useRef } from 'react';

export const useDidMountEffect = (fn: () => void, arg: any) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) fn();
    else didMount.current = true;
  }, arg);
};
