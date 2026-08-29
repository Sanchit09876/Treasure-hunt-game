import React from "react";

const BetInput = ({ betAmount, setBetAmount, gameStatus }) => {
  return (
    <div>
      <div className="relative">
        <span className="absolute top-1 left-1 text-yellow-500 text-[18px] font-bold select-none">$</span>
        <input
          type="number"
          value={betAmount === 0 || betAmount === "" ? "" : betAmount}
          onChange={(e) => {
            const value = e.target.value;
            if(value.includes(".") && value.split(".")[1].length > 2) return;
            setBetAmount(Number(e.target.value));
          }}
          step="1"
          disabled={gameStatus === "playing"}
          placeholder="10.00"
          className="border border-yellow-300 rounded-lg p-1 text-center text-yellow-500 font-medium placeholder:text-center placeholder:text-gray-400 focus:ring-0 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default BetInput;
