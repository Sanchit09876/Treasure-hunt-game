import React from "react";
import { getRowMultiplier } from "../utils/gameLogic";

const StatusBar = ({
  balance,
  gameStatus,
  currentMultiplier,
  difficulty,
  currentRow,
  activeBet,
}) => {
  const previewMultiplier = getRowMultiplier(difficulty, currentRow);
  return (
    <div className="flex justify-center">
      <div className="inline-flex gap-5 border p-2 rounded-lg">
        <div className="flex flex-col items-center">
          <p>BALANCE</p>
          <p>${balance.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p>BET AMOUNT</p>
          <p>${activeBet.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p>CURRENT MULTIPLIER</p>
          <p>{currentMultiplier}X</p>
        </div>
        <div className="flex flex-col items-center">
          <p>CURRENT PAYOUT</p>
          <p>${(activeBet * currentMultiplier).toFixed(2)}</p>
        </div>

        {/* <p>Current Difficulty: {difficulty}</p> */}
        {/* <p>Current Row Multiplier: {previewMultiplier}X </p> */}
        {gameStatus === "lost" && <p>You Loose! Try Again</p>}
        {gameStatus === "won" && <p>You Win! Congratulations!!!</p>}
        {gameStatus === "cashed" && (
          <p>You cashed ${(activeBet * currentMultiplier).toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};

export default StatusBar;
