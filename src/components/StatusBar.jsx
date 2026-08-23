import React from "react";
import { getRowMultiplier } from "../utils/gameLogic";

const StatusBar = ({ balance, gameStatus, betAmount, currentMultiplier, difficulty, currentRow }) => {
  const previewMultiplier = getRowMultiplier(difficulty, currentRow);
  return (
    <div>
      <div>
        <p>Your Balance: {balance.toFixed(2)}</p>
        <p>Your Bet Amount: {betAmount.toFixed(2)}</p>
        <p>Your Current Multiplier: {currentMultiplier}</p>
        <p>Currently you can earn: {(betAmount * currentMultiplier).toFixed(2)}</p>
        <p>Current Difficulty: {difficulty}</p>
        <p>Current Row Multiplier: {previewMultiplier} </p>
        {gameStatus === "lost" && <p>You Loose! Try Again</p>}
        {gameStatus === "won" && <p>You Win! Congratulations!!!</p>}
      </div>
    </div>
  );
};

export default StatusBar;
