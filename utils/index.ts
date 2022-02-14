import { LetterMap, LetterState } from "../interfaces";
import { possibleWords, candidateWords } from "./database";

const initLetterMap = (): LetterMap => {
  const obj = {};
  "abcdefghijklmnopqrstuvxwyz".split("").forEach((char) => {
    Object.assign(obj, Object.fromEntries([[char, LetterState.Unknown]]));
  });
  return obj;
};

const isWordPossible = (word: string) => {
  return candidateWords.includes(word) || possibleWords.includes(word);
};

const getRandomPossibleWord = () => {
  const index = Math.ceil(Math.random() * candidateWords.length);
  return candidateWords[index];
};

export { initLetterMap, isWordPossible, getRandomPossibleWord };
