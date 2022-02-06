import React, { useState } from "react";
import Square from "./Square";
import "./screen.scss";
import useRules from "./useRules";
import GameResult from "./GameResult";
import ErrorBoundary from "./ErrorBoundary";
const Screen = function () {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [isFinished, setFinished] = useState(false);
  const [playerDetails, setPlayerDetails] = useState([]);
  const [isPreviewMode, setPreviewMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { checkCrossMatch, checkXMatch, checkYMatch } = useRules();

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
        <ErrorBoundary>
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
                    <Square
                      key={i}
                      isFinished={true}
                      index={i}
                      player={player}
                    />
                  ))}
          </div>
        </ErrorBoundary>

        <GameResult
          replayGame={replayGame}
          newGame={newGame}
          currentPlayer={currentPlayer}
          isFinished={isFinished}
          playerDetails={playerDetails}
          previewSquares={previewSquares}
        />
      </div>
    </div>
  );
};

export default Screen;
