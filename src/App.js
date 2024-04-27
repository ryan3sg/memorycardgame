import React, { useState } from "react";
import "./App.css";
import GameBoard from "./GameBoard";
import Start from "./Start";

const App = () => {
  const [gameBoard, setGameBoard] = useState(false);
  const type = useState(2);
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Memory Game</h1>
        </div>
        {gameBoard ? (
          <GameBoard setGameBoard={setGameBoard} type={type} />
        ) : (
          <Start setGameBoard={setGameBoard} type={type} />
        )}
      </div>
    </div>
  );
};

export default App;
