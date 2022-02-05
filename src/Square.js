import React from "react";
import "./square.scss";
const Square = function ({ index, updateSquares, player }) {
  const clickhandler = (i) => {
    updateSquares(i);
  };
  return (
    <div className="square">
      <p className="square__player" onClick={() => clickhandler(index)}>
        {player}
      </p>
    </div>
  );
};

export default Square;
