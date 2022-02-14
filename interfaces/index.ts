export enum LetterState {
  Unknown = "unknown",
  NotUsed = "notused",
  Correct = "correct",
  Used = "used",
}

export type LetterMap = {
  [x: string]: LetterState;
};

export type GuessLetter = {
  char: string;
  state: LetterState;
};

export type Guess = {
  active: boolean;
  data: GuessLetter[];
};
