import React, { useState } from "react";
import Square from "./Square";
import "./screen.scss";
const Screen = function () {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("O");

  const checkXMatch = (i, temp) => {
    while (i <= 6) {
      if (temp[i] && temp[i] === temp[i + 1] && temp[i + 1] === temp[i + 2]) {
        return true;
      }
      i = (i + 1) * 3;
    }
    return false;
  };
  const checkYMatch = (i, temp) => {
    while (i <= 2) {
      if (temp[i] && temp[i] === temp[i + 3] && temp[i + 3] === temp[i + 6]) {
        return true;
      }
      i = i + 1;
    }
    return false;
  };
  const checkCrossMatch = (i, temp) => {
    if (
      temp[i] === temp[(i + 1) * 4] &&
      temp[(i + 1) * 4] === temp[(i + 2) * 4] &&
      temp[i]
    ) {
      return true;
    }
    i = 2;
    if (
      temp[i] &&
      temp[i] === temp[i * 2] &&
      temp[i * 2] === temp[(i + 1) * 2]
    ) {
      return true;
    }
    return false;
  };

  const updateSquares = (index) => {
    const temp = squares.slice();
    temp[index] = currentPlayer;

    if (
      checkXMatch(0, temp) ||
      checkYMatch(0, temp) ||
      checkCrossMatch(0, temp)
    ) {
      console.log("match finished");
    }
    if (currentPlayer === "O") {
      setCurrentPlayer("X");
    } else {
      setCurrentPlayer("O");
    }
    setSquares(temp);
  };
  return (
    <div className="squares">
      {squares.map((player, i) => (
        <Square
          key={i}
          index={i}
          player={player}
          updateSquares={updateSquares}
        />
      ))}
    </div>
  );
};

export default Screen;
