import React from "react";

const PlayerDetail = function ({ playerDetails, previewSquares }) {
  return (
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
  );
};

export default PlayerDetail;
