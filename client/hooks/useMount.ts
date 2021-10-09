import { useEffect, useRef } from 'react';

const useMount = (fn: () => void, arg: any) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) fn();
    else didMount.current = true;
  }, arg);
};

export default useMount;
