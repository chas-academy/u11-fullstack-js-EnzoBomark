import { useCallback, useRef } from 'react';

const useObserver = (inView: () => void) => {
  const observer = useRef<IntersectionObserver>();

  const lastElemRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        inView();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return { lastElemRef };
};

export default useObserver;
