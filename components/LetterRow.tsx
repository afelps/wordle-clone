import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Guess, GuessLetter, LetterState } from "../interfaces";
import Letter from "./Letter";

type Props = {
  guess: Guess;
};

const LetterRow = ({ guess }: Props) => {
  const { word } = useContext(GameContext);
  return (
    <div className="flex flex-row">
      {word.split("").map((v, i) => {
        const letter = guess.data[i];
        return (
          <Letter
            key={i}
            letter={letter?.char || ""}
            state={letter?.state || LetterState.Unknown}
            showLetter={guess.active || guess.data.length == word.length}
            showState={!guess.active}
          />
        );
      })}
    </div>
  );
};

export default LetterRow;
