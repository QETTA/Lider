import { useEffect, useState, type RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  once?: boolean;
  margin?: string;
}

export function useInView(
  ref: RefObject<Element>,
  options: UseInViewOptions = {}
): boolean {
  const { threshold = 0, once = false, margin = '0px' } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (inView && once) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: margin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold, once, margin]);

  return isInView;
}
