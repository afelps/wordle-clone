import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const useTimedState = <T>(
  defaultValue: T,
  delay: number
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultValue);
  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (state != defaultValue) {
      clearTimeout(timer.current);
      timer.current = setTimeout(setState, delay, defaultValue);
    }
  }, [state]);
  return [state, setState];
};

export default useTimedState;
