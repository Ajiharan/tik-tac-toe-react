import React from "react";
import PlayerDetail from "./PlayerDetail";

const GameResult = function ({
  playerDetails,
  previewSquares,
  isFinished,
  currentPlayer,
  newGame,
  replayGame
}) {
  return (
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
        <PlayerDetail
          playerDetails={playerDetails}
          previewSquares={previewSquares}
        />
      )}
    </div>
  );
};

export default GameResult;
