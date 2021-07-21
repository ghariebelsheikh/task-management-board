import { goTrySync } from "go-try";
import { useCallback, useEffect, useState } from "react";

export function useTaskState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getValue = useCallback(
    () =>
      goTrySync(() => JSON.parse(localStorage.getItem(key) ?? "")).data ??
      initialValue,
    [initialValue, key]
  );

  const [state, setState] = useState<T>(() => getValue());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
