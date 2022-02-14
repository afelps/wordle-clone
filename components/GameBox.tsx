import { doesNotReject } from "assert";
import React, { PropsWithChildren } from "react";
import { GameContext, GameContextValue } from "../contexts/GameContext";
import { LetterState } from "../interfaces";

type Props = {
  title?: string;
  context: GameContextValue;
};

const GameBox = ({ title, context, children }: PropsWithChildren<Props>) => {
  return (
    <div className="bg-gray-300 h-screen font-sans flex flex-col justify-center items-center w-auto p-6">
      {title && <h1 className="first-letter:text-6xl text-5xl"> {title} </h1>}
      <GameContext.Provider value={context}>{children}</GameContext.Provider>
      <Todo />
    </div>
  );
};

type TodoItem = {
  done: boolean;
  description: string;
};

const Todo = () => {
  const todos: TodoItem[] = [
    { done: true, description: "Layout" },
    { done: true, description: "Core game loop" },
    { done: true, description: "Pull word database" },
    { done: false, description: "Fake double letter as state 'notused'" },
    { done: false, description: "Add hard mode" },
    { done: false, description: "Statistics on localstorage" },
  ];

  return (
    <div className="fixed flex flex-col justify-center right-10 shadow-md bg-gray-200 rounded-md">
      <span className="text-center text-2xl">Todos:</span>
      {todos.map(({ done, description }, i) => {
        return (
          <div
            key={i}
            className="flex justify-between px-5 border-b-2 border-gray-300 relative"
          >
            <input
              className="mr-5 h-6"
              type="checkbox"
              checked={done}
              disabled={true}
            />
            <span className="text-right">{description}</span>
          </div>
        );
      })}
    </div>
  );
};

export default GameBox;
