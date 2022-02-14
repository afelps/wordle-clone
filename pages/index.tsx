import { useState } from "react";
import Board from "../components/Board";
import { EndModal } from "../components/EndModal";
import GameBox from "../components/GameBox";
import Keyboard from "../components/Keyboard";
import MessageDisplay from "../components/MessageDisplay";
import useTimedState from "../hooks/useTimedState";
import { Guess, LetterMap, LetterState } from "../interfaces";
import {
  getCharCount,
  getRandomPossibleWord,
  initLetterMap,
  isWordPossible,
} from "../utils";

const IndexPage = () => {
  const chances = 6;

  const [letterMap, setLetterMap] = useState<LetterMap>(initLetterMap());
  const [word, setWord] = useState<string>(getRandomPossibleWord());
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [win, setWon] = useState<boolean>(false);
  const [errorDisplay, setErrorDisplay] = useTimedState<string>("", 3000);

  const guesses = Array(chances)
    .fill(null)
    .map((_, i) => useState<Guess>({ data: [], active: i == 0 }));

  const handleSubmit = () => {
    const validateGuess = (guess: Guess) => {
      if (guess.data.length != word.length) {
        setErrorDisplay("Complete the word");
        return true; // break
      } else if (!isWordPossible(guess.data.map((v) => v.char).join(""))) {
        setErrorDisplay("Not a word");
        return true;
      }
    };
    const getUpdatedStates = (guess: Guess) => {
      const guessWord = guess.data.map((v) => v.char).join("");
      return guess.data.map(({ char }, i) => {
        let state = LetterState.Unknown;

        if (char == word.charAt(i)) {
          state = LetterState.Correct;
        } else if (word.includes(char)) {
          //Handle double lettered guess
          const hasMoreOfCharThanWord =
            getCharCount(guessWord, char) > getCharCount(word, char);
          const isLastGuessOccurrence = guessWord.lastIndexOf(char) == i;
          if (!isLastGuessOccurrence && hasMoreOfCharThanWord) {
            state = LetterState.NotUsed;
          } else {
            state = LetterState.Used;
          }
        } else {
          state = LetterState.NotUsed;
        }

        letterMap[char] = state;
        setLetterMap({ ...letterMap });
        return { char: char, state: state };
      });
    };

    guesses.some(([value, setter], i) => {
      //update active guess letter states and inactivate it
      if (value.active) {
        if (validateGuess(value)) return true; // break
        const data = getUpdatedStates(value);
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
    }) || setGameEnded(true); //Ends game on no active guesses
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
      context={{ letterMap: letterMap, word: word }}
      title="Wordle Clone"
    >
      <Board guesses={guesses.map(([value, setter]) => value)} />
      <Keyboard
        onNewKey={handleNewKey}
        onBackspace={handleBackspace}
        onSubmit={handleSubmit}
        enabled={!gameEnded}
      />
      <EndModal
        show={gameEnded}
        guesses={guesses.map(([v, s]) => v)}
        onExit={handleRestart}
        win={win}
      />
      <MessageDisplay text={errorDisplay} />
    </GameBox>
  );
};

export default IndexPage;
