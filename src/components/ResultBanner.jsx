import React from "react";

const ResultBanner = ({
  gameStatus,
  currentRow,
  activeBet,
  currentMultiplier,
}) => {
  const winText = "You Win!";
  const lossText = "You Loose!";
  const cashedText = "Cashed Out!";
  return (
    <div className="flex justify-center">
      {gameStatus === "won" ||
      gameStatus === "lost" ||
      gameStatus === "cashed" ? (
        <>
          <div className="text-white border p-2 rounded-lg">
            {gameStatus === "won" && (
              <div>
                {winText}
                <p>Cashed Out at {currentMultiplier}x</p>
                <p>+${currentMultiplier * activeBet}</p>
              </div>
            )}
            {gameStatus === "lost" && (
              <div>
                {lossText}
                <p>Hit a skull on Row {currentRow + 1}</p>
                <p>-${activeBet}</p>
              </div>
            )}
            {gameStatus === "cashed" && (
              <div>
                {cashedText}
                <p>Cashed Out at {currentMultiplier}x</p>
                <p>+${currentMultiplier * activeBet}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ResultBanner;
