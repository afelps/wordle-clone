import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

function LosePanel() {
  const { word } = useContext(GameContext);

  return (
    <div className="bg-gray-100 p-10">
      <h1 className="text-center">Better luck next time!</h1>
      <p>
        The word was <strong>{word}</strong>!
      </p>
    </div>
  );
}

export default LosePanel;
