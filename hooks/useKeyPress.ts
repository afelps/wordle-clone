import { useEffect, useRef, useState } from "react";

type Callback = (key: string) => void;

const useKeyPress = (targets: string[], callback: Callback) => {
  const callbackRef = useRef<Callback>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const downHandler = ({ key }) => {
    const k = targets.find((t) => t.toUpperCase() == key.toUpperCase());
    k && callbackRef.current(k);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);
};

export default useKeyPress;
