"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LoaderContextValue = {
  /** True once the preloader has finished (or was skipped). */
  loaded: boolean;
  finish: () => void;
};

const LoaderContext = createContext<LoaderContextValue>({
  loaded: true,
  finish: () => {},
});

/** Gates entrance animations (hero) behind the preloader. */
export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const finish = useCallback(() => setLoaded(true), []);
  const value = useMemo(() => ({ loaded, finish }), [loaded, finish]);
  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}

export function useLoader(): LoaderContextValue {
  return useContext(LoaderContext);
}
