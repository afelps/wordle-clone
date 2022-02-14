import React, { PropsWithChildren } from "react";
import useKeyPress from "../hooks/useKeyPress";
import KeyboardKey from "./KeyboardKey";

type Props = {
  onNewKey: (newKey: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  enabled: boolean;
};

const Keyboard = ({ onNewKey, onBackspace, onSubmit, enabled }: Props) => {
  const handleBackspace = () => enabled && onBackspace();
  const handleEnter = () => enabled && onSubmit();
  const handleLetter = (newKey) => enabled && onNewKey(newKey);

  useKeyPress(["Backspace"], handleBackspace);
  useKeyPress(["Enter"], handleEnter);
  useKeyPress("abcdefghijklmnopqrstuvwxyz".split(""), handleLetter);

  const getKeys = (keys: string) => {
    return keys
      .split("")
      .map((char) => (
        <KeyboardKey
          key={char}
          value={char}
          onClick={() => handleLetter(char)}
        />
      ));
  };

  return (
    <KeyContainer>
      <KeyRow>{getKeys("qwertyuiop")}</KeyRow>
      <KeyRow>{getKeys("asdfghjkl")}</KeyRow>
      <KeyRow>
        <KeyboardKey value="Enter" onClick={handleEnter} />
        {getKeys("zxcvbnm")}
        <KeyboardKey value="Back" onClick={handleBackspace} />
      </KeyRow>
    </KeyContainer>
  );
};

const KeyContainer = ({ children }: PropsWithChildren<{}>) => (
  <div className=" flex flex-col p-5 mt-5">{children}</div>
);

const KeyRow = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex flex-row justify-center">{children}</div>
);

export default Keyboard;
