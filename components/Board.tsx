import React from "react";
import { Guess } from "../interfaces";
import LetterRow from "./LetterRow";

type Props = {
  guesses: Guess[];
};

const Board = ({ guesses }: Props) => {
  return (
    <div className="flex flex-col mt-10 p-0">
      {guesses.map((guess, i) => (
        <LetterRow key={i} guess={guess} />
      ))}
    </div>
  );
};

export default Board;
