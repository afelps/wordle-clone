import { createContext } from "react";
import { LetterState } from "../interfaces";

export type GameContextValue = {
  letterMap: Record<string, LetterState>;
  word: string;
};

export const GameContext = createContext<GameContextValue>({
  letterMap: {},
  word: "",
});
