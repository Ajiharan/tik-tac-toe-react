import React, { useState, useEffect } from "react";
import Square from "./Square";
import "./screen.scss";
const Screen = function () {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [isFinished, setFinished] = useState(false);
  const [playerDetails, setPlayerDetails] = useState([]);
  const [isPreviewMode, setPreviewMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const previewSquares = (i) => {
    setPreviewMode(true);
    setCurrentIndex(i);
  };

  const resumeGame = () => {
    setPreviewMode(false);
  };

  const replayGame = () => {};
  return (
    <div className="gameView">
      <div className="btn__container">
        {isPreviewMode && (
          <button onClick={resumeGame} className="btn btn--back">
            Back To Game
          </button>
        )}
      </div>

      <div className="game">
        <div className="squares">
          {!isPreviewMode
            ? squares.map((player, i) => (
                <Square
                  key={i}
                  isFinished={isFinished}
                  index={i}
                  player={player}
                  updateSquares={updateSquares}
                />
              ))
            : playerDetails
                .find(({ index }) => index === currentIndex)
                ?.squares.map((player, i) => (
                  <Square key={i} isFinished={true} index={i} player={player} />
                ))}
        </div>
        <div className="gameResult">
          {isFinished ? (
            <div>
              <p>player {currentPlayer} wins</p>
              <button className="btn btn--again" onClick={newGame}>
                Play Again
              </button>
              <button className="btn btn--replay" onClick={replayGame}>
                Replay
              </button>
            </div>
          ) : (
            <React.Fragment>
              <h5 className="gameResult__heading"> Player Details</h5>
              {playerDetails.reverse().map(({ index, currentPlayer }) => (
                <p
                  key={index}
                  onClick={() => {
                    previewSquares(index);
                  }}
                  className="gameResult__detail"
                >
                  player {currentPlayer} take [{index}] position
                </p>
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Screen;
