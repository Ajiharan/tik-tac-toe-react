import React, { useState, useReducer } from "react";
import Square from "./Square";
import "./screen.scss";
import useRules from "./useRules";
import GameResult from "./GameResult";
import ErrorBoundary from "./ErrorBoundary";

const initialState = {
  squares: new Array(9).fill(null),
  currentPlayer: "O",
  isFinished: false,
  playerDetails: [],
  isPreviewMode: false,
  currentIndex: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setSquares":
      return { ...state, squares: action.payload };
    case "setCurrentPlayer":
      return { ...state, currentPlayer: action.payload };
    case "setFinished":
      return { ...state, isFinished: action.payload };
    case "setPlayerDetails":
      return { ...state, playerDetails: action.payload };
    case "setPreviewMode":
      return { ...state, isPreviewMode: action.payload };
    case "setCurrentIndex":
      return { ...state, currentIndex: action.payload };
    default:
      return state;
  }
};
const NewScreen = function () {
  const [
    {
      squares,
      currentIndex,
      currentPlayer,
      playerDetails,
      isFinished,
      isPreviewMode
    },
    dispatch
  ] = useReducer(reducer, initialState);

  const dispatchFunc = (type, payload) => {
    dispatch({ type, payload });
  };
  const { checkCrossMatch, checkXMatch, checkYMatch } = useRules();

  const updateSquares = (index) => {
    if (squares[index]) return;
    const temp = squares.slice();
    temp[index] = currentPlayer;

    dispatchFunc("setPlayerDetails", [
      ...playerDetails,
      { index, currentPlayer, squares: temp }
    ]);

    if (
      checkXMatch(0, temp) ||
      checkYMatch(0, temp) ||
      checkCrossMatch(0, temp)
    ) {
      console.log("match finished");
      dispatchFunc("setFinished", true);
    } else {
      if (currentPlayer === "O") {
        dispatchFunc("setCurrentPlayer", "X");
      } else {
        dispatchFunc("setCurrentPlayer", "O");
      }
    }

    dispatchFunc("setSquares", temp);
  };

  const newGame = () => {
    dispatchFunc("setSquares", new Array(9).fill(null));
    dispatchFunc("setCurrentPlayer", "O");
    dispatchFunc("setFinished", false);
    dispatchFunc("setPlayerDetails", []);
  };

  const previewSquares = (i) => {
    dispatchFunc("setPreviewMode", true);

    dispatchFunc("setCurrentIndex", i);
  };

  const resumeGame = () => {
    dispatchFunc("setPreviewMode", false);
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

export default NewScreen;
