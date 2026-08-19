import {
  type DependencyList,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

interface ScrollOverflowState {
  canScrollUp: boolean;
  canScrollDown: boolean;
}

const EPSILON = 1;

export function useScrollOverflow<T extends HTMLElement>(
  ref: RefObject<T | null>,
  deps: DependencyList = [],
): ScrollOverflowState {
  const [state, setState] = useState<ScrollOverflowState>({
    canScrollUp: false,
    canScrollDown: false,
  });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const hasOverflow = el.scrollHeight > el.clientHeight + EPSILON;
    setState({
      canScrollUp: hasOverflow && el.scrollTop > EPSILON,
      canScrollDown:
        hasOverflow &&
        el.scrollTop < el.scrollHeight - el.clientHeight - EPSILON,
    });
  }, [ref, ...deps]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      resizeObserver.disconnect();
    };
  }, [ref, measure]);

  return state;
}
