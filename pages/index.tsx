import { useEffect, useState } from "react";
import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import GameBox from "../components/GameBox";
import Modal from "../components/Modal";
import { Guess, LetterMap, LetterState } from "../interfaces";
import { initLetterMap, getRandomPossibleWord, isWordPossible } from "../utils";
import WinPanel from "../components/WinPanel";
import LosePanel from "../components/LosePanel";
import { setTimeout } from "timers";
import MessageDisplay from "../components/MessageDisplay";

const IndexPage = () => {
  const chances = 6;
  const errorTime = 2000;

  const [letterMap, setLetterMap] = useState<LetterMap>(initLetterMap());
  // const [word, setWord] = useState<string>(getRandomPossibleWord());
  const [word, setWord] = useState<string>("geeks");
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [errorDisplay, setErrorDisplay] = useState<string>("");

  useEffect(() => {
    setTimeout(setErrorDisplay, errorTime, "");
  }, [errorDisplay]);

  useEffect(() => {
    console.log("Word: ", word);
  }, [word]);

  const guesses = Array(chances)
    .fill(null)
    .map((_, i) => useState<Guess>({ data: [], active: i == 0 }));

  const verifyLetter = (letter: string, index: number) => {
    let state = LetterState.Unknown;
    const occurenceCount = () => {
      const letterLess = word.replace(letter, "");
      return word.length - letterLess.length;
    };
    if (letter == word.charAt(index)) state = LetterState.Correct;
    else if (word.includes(letter) && occurenceCount())
      //todo: fix this
      state = LetterState.Used;
    else state = LetterState.NotUsed;
    letterMap[letter] = state;
    setLetterMap({ ...letterMap });
    return state;
  };

  const handleSubmit = () => {
    guesses.some(([value, setter], i) => {
      //update active guess letter states and inactivate it
      if (value.active) {
        if (value.data.length != word.length) {
          setErrorDisplay("Complete the word");
          return true; // break
        } else if (!isWordPossible(value.data.map((v) => v.char).join(""))) {
          setErrorDisplay("Not a word");
          return true;
        }
        const data = value.data.map(({ char, state }, i) => {
          return { char: char, state: verifyLetter(char, i) };
        });
        if (data.every((v) => v.state == LetterState.Correct)) {
          setWon(true);
          setGameEnded(true);
        }
        setter({ data: data, active: false });
      }
      //first empty guess turns active
      if (value.data.length == 0) {
        setter({ ...value, active: true });
        return true; // break;
      }
      return false;
    }) || setGameEnded(true);
  };

  const handleNewKey = (newKey) => {
    const [value, setter] = guesses.find(([value, setter]) => value.active);
    if (value.data.length < word.length) {
      value.data.push({
        char: newKey,
        state: LetterState.Unknown,
      });
      setter({ ...value });
    }
  };

  const handleBackspace = () => {
    const [value, setter] = guesses.find(([value, setter]) => value.active);
    if (value.data) {
      value.data.pop();
      setter({ ...value });
    }
  };

  const handleRestart = () => {
    setGameEnded(false);
    setWon(false);
    setLetterMap(initLetterMap());
    guesses.map(([value, setter], i) => {
      setter({ data: [], active: i == 0 });
    });
    setWord(getRandomPossibleWord());
  };

  return (
    <GameBox
      title="Wordle Clone"
      context={{ letterMap: letterMap, word: word }}
    >
      <Board guesses={guesses.map(([value, setter]) => value)} />
      <Keyboard
        onNewKey={handleNewKey}
        onBackspace={handleBackspace}
        onSubmit={handleSubmit}
        enabled={!gameEnded}
      />
      <Modal show={gameEnded} onExit={handleRestart}>
        {won ? (
          <WinPanel guesses={guesses.map(([v, s]) => v)} />
        ) : (
          <LosePanel />
        )}
      </Modal>
      {errorDisplay && <MessageDisplay text={errorDisplay} />}
    </GameBox>
  );
};

export default IndexPage;
