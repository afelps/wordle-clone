import { doesNotReject } from "assert";
import React, { PropsWithChildren } from "react";
import { GameContext, GameContextValue } from "../contexts/GameContext";
import { LetterState } from "../interfaces";

type Props = {
  title?: string;
  context: GameContextValue;
};

const GameBox = ({ title, context, children }: PropsWithChildren<Props>) => {
  return (
    <div className="bg-gray-300 h-screen font-sans flex flex-col justify-center items-center w-auto p-6">
      {title && <h1 className="first-letter:text-6xl text-5xl"> {title} </h1>}
      <GameContext.Provider value={context}>{children}</GameContext.Provider>
    </div>
  );
};

export default GameBox;
