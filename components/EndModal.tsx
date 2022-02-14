import React from "react";
import { Guess } from "../interfaces";
import LosePanel from "./LosePanel";
import Modal from "./Modal";
import WinPanel from "./WinPanel";

type Props = {
  win: boolean;
  show: boolean;
  guesses: Guess[];
  onExit: () => void;
};

export const EndModal = ({ win, show, guesses, onExit }: Props) => {
  return (
    <Modal show={show} onExit={onExit}>
      {win ? <WinPanel guesses={guesses} /> : <LosePanel />}
    </Modal>
  );
};
