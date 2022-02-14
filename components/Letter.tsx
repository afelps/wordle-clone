import React, { PropsWithChildren } from "react";
import { LetterState } from "../interfaces";

type Props = {
  letter: string;
  state: LetterState;
  showLetter: boolean;
  showState: boolean;
};

const Letter = ({ letter, state, showLetter, showState }: Props) => {
  const stateToCss = {
    [LetterState.Unknown]: "bg-gray-100 border-gray-100 text-black",
    [LetterState.Correct]: "bg-green-500 border-green-600 text-slate-50",
    [LetterState.Used]: "bg-yellow-400 border-yellow-500 text-slate-50",
    [LetterState.NotUsed]: "bg-gray-500 border-gray-600 text-slate-50",
  };

  return (
    <LetterBox styling={stateToCss[showState ? state : LetterState.Unknown]}>
      <LetterText text={showLetter ? letter : ""} />
    </LetterBox>
  );
};

const LetterBox = ({
  styling,
  children,
}: PropsWithChildren<{ styling: string }>) => (
  <div
    className={`m-1 flex flex-col justify-center shadow-md w-14 h-14 rounded ${styling}`}
  >
    {children}
  </div>
);

const LetterText = ({ text }: { text: string }) => (
  <h3 className="h-f text-3xl text-center select-none">{text.toUpperCase()}</h3>
);

export default Letter;
