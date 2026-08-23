import React from "react";

const BetInput = ({ betAmount, setBetAmount, gameStatus }) => {
  return (
    <div>
      <div>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          step="0.05"
          disabled={gameStatus === "playing"}
          placeholder="Place Bets"
          className="border"
        />
      </div>
    </div>
  );
};

export default BetInput;
