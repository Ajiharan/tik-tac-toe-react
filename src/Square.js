import React from "react";
import "./square.scss";
const Square = function ({ isFinished, index, updateSquares, player }) {
  const clickhandler = (i) => {
    updateSquares(i);
  };
  return (
    <button
      className="square"
      onClick={() => clickhandler(index)}
      disabled={isFinished}
    >
      <p className="square__player">{player}</p>
    </button>
  );
};

export default Square;
