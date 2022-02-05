import React, { useState } from "react";
import Square from "./Square";
import "./screen.scss";
const Screen = function () {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("O");

  const updateSquares = (index) => {
    const temp = squares.slice();
    temp[index] = currentPlayer;
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
