import React from "react";
import { getRowMultiplier } from "../utils/gameLogic";

const StatusBar = ({ balance, gameStatus, currentMultiplier, difficulty, currentRow, activeBet }) => {
  const previewMultiplier = getRowMultiplier(difficulty, currentRow);
  return (
    <div>
      <div>
        <p>Your Balance: ${balance.toFixed(2)}</p>
        <p>Your Bet Amount: ${activeBet.toFixed(2)}</p>
        <p>Your Current Multiplier: {currentMultiplier}X</p>
        <p>Currently you can earn: ${(activeBet * currentMultiplier).toFixed(2)}</p>
        <p>Current Difficulty: {difficulty}</p>
        <p>Current Row Multiplier: {previewMultiplier}X </p>
        {gameStatus === "lost" && <p>You Loose! Try Again</p>}
        {gameStatus === "won" && <p>You Win! Congratulations!!!</p>}
        {gameStatus === "cashed" && <p>You cashed ${(activeBet * currentMultiplier).toFixed(2)}</p>}
      </div>
    </div>
  );
};

export default StatusBar;
