import React from "react";
import { useState } from "react";
import CardRow from "./CardRow";

import { generateRowCards, getRowMultiplier } from "../utils/gameLogic";
import difficultyConfig from "../data/difficultyConfig";

function Game() {
  const [balance, setBalance] = useState(100);
  const [betAmount, setBetAmount] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [gameStatus, setGameStatus] = useState("idle");
  const [currentRow, setCurrentRow] = useState(0);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [rows, setRows] = useState([]);
  const [rowLocked, setRowLocked] = useState(false);

  function startGame() {
    setBalance(balance - betAmount);
    setCurrentRow(0);
    setCurrentMultiplier(1);
    setGameStatus("playing");

    const newRows = Array.from({ length: 4 }, (_, i) => {
      return { cards: generateRowCards(6, difficultyConfig[difficulty].skull) };
    });
    setRows(newRows);
  }

  const handleCardFlip = (type) => {
    if (type === "skull") {
      setGameStatus("lost");
      setRowLocked(true);
      return;
    }
    if(currentRow === 3){
        setCurrentMultiplier(getRowMultiplier(difficulty, currentRow));
        setGameStatus('won');
        setRowLocked(true);
        return;
    }
    setRowLocked(true);
    setCurrentMultiplier(getRowMultiplier(difficulty, currentRow));
    setCurrentRow(currentRow + 1);
    setRowLocked(false);
  };


  return (
    <div>
      <button onClick={startGame}>Start Game</button>
      {console.log(rows)}

      {rows.map((row, index) => {
        return (
          <CardRow
            key={index}
            cards={row.cards}
            isActive={index === currentRow}
            onCardFlip={handleCardFlip}
            rowLocked={rowLocked}
          />
        );
      })}
    </div>
  );
}

export default Game;
