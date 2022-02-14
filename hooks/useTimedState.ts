import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useTimedState = <T>(
  defaultValue: T,
  delay: number
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    if (state != defaultValue) {
      setTimeout(setState, delay, defaultValue);
    }
  }, [state]);

  return [state, setState];
};

export default useTimedState;
