import React, { PropsWithChildren, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { LetterState } from "../interfaces";

type Props = {
  value: string;
  onClick: (key: string) => void;
};
const KeyboardKey = ({ value, onClick }: Props) => {
  const { letterMap } = useContext(GameContext);

  return (
    <KeyBox state={letterMap[value]} onClick={() => onClick(value)}>
      <KeyText value={value} />
    </KeyBox>
  );
};

const KeyText = ({ value }: { value: string }) => (
  <h3 className="py-2 select-none text-sm text-center font-mono">
    {value.toUpperCase()}
  </h3>
);

const KeyBox = ({
  children,
  state,
  onClick,
}: PropsWithChildren<{ state: LetterState; onClick: () => void }>) => {
  const stateToCss = {
    [LetterState.Unknown]: "bg-white border-gray-200 text-black",
    [LetterState.Correct]: "bg-green-500 border-green-600 text-white",
    [LetterState.Used]: "bg-yellow-400 border-yellow-500 text-white",
    [LetterState.NotUsed]: "bg-gray-500 border-gray-600 text-white",
  };
  const stateStyle = stateToCss[state] || stateToCss[LetterState.Unknown];

  return (
    <div
      className={`w-fit flex flex-col justify-center px-2 h-10 m-1 hover:shadow-md active:shadow-sm rounded ${stateStyle}`}
      onClick={() => onClick()}
    >
      {children}
    </div>
  );
};

export default KeyboardKey;
