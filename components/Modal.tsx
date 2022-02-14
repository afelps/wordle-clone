import React from "react";
import useKeyPress from "../hooks/useKeyPress";

type Props = {
  show: boolean;
  onExit: () => void;
  children?: JSX.Element;
};

const Modal = ({ show, children, onExit }: Props) => {
  if (!show) return <></>;
  return (
    <div
      className="w-full h-full bg-gray-900 bg-opacity-80 fixed flex justify-center items-center"
      onClick={onExit}
    >
      {children}
    </div>
  );
};

export default Modal;
