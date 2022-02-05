import React, { useState } from "react";
import Square from "./Square";
import "./screen.scss";
const Screen = function () {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [isFinished, setFinished] = useState(false);
  const [playerDetails, setPlayerDetails] = useState([]);
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
    if (squares[index]) return;
    const temp = squares.slice();
    temp[index] = currentPlayer;
    setPlayerDetails([
      ...playerDetails,
      { index, currentPlayer, squares: temp }
    ]);

    if (
      checkXMatch(0, temp) ||
      checkYMatch(0, temp) ||
      checkCrossMatch(0, temp)
    ) {
      console.log("match finished");
      setFinished(true);
    } else {
      if (currentPlayer === "O") {
        setCurrentPlayer("X");
      } else {
        setCurrentPlayer("O");
      }
    }

    setSquares(temp);
  };

  const newGame = () => {
    setSquares(new Array(9).fill(null));
    setCurrentPlayer("O");
    setFinished(false);
    setPlayerDetails([]);
  };
  return (
    <div className="game">
      <div className="squares">
        {squares.map((player, i) => (
          <Square
            key={i}
            isFinished={isFinished}
            index={i}
            player={player}
            updateSquares={updateSquares}
          />
        ))}
      </div>
      <div className="result">
        {isFinished ? (
          <div>
            <p>player {currentPlayer} wins</p>
            <button onClick={newGame}>Play Again</button>
          </div>
        ) : (
          playerDetails.map(({ index, currentPlayer }) => (
            <p key={index}>
              player {currentPlayer} take [{index}] position
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default Screen;
