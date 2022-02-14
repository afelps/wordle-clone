import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Guess } from "../interfaces";

type Props = {
  guesses: Guess[];
};

function WinPanel({ guesses }: Props) {
  const { word } = useContext(GameContext);

  const numeral = {
    1: "st",
    2: "nd",
    3: "rd",
  };
  const guessIndex = guesses.findIndex((v) => v.active);
  const text =
    guessIndex > 0 ? guessIndex + (numeral[guessIndex] || "th") : "last";

  return (
    <div className="bg-gray-100 p-10">
      <h1 className="text-center">Congratulations</h1>
      <p>
        The word was <strong>{word}</strong> and you got it on your{" "}
        <strong>{text}</strong> guess!
      </p>
    </div>
  );
}

export default WinPanel;
