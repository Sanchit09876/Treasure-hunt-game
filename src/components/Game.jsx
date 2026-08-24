import React from "react";
import { useState, useEffect } from "react";
import CardRow from "./CardRow";

import { generateRowCards, getRowMultiplier } from "../utils/gameLogic";
import difficultyConfig from "../data/difficultyConfig";
import BetInput from "./BetInput";
import StatusBar from "./StatusBar";
import DifficultySelector from "./DifficultySelector";
import Header from "./Header";

import { Play } from "lucide-react";

function Game() {
  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem("treasureHuntBalance");
    if (storedBalance === null) {
      return 100;
    }
    return Number(storedBalance);
  });
  const [betAmount, setBetAmount] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [gameStatus, setGameStatus] = useState("idle");
  const [currentRow, setCurrentRow] = useState(0);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [rows, setRows] = useState([]);
  const [rowLocked, setRowLocked] = useState(false);
  const [roundId, setRoundId] = useState(0);
  const [err, setErr] = useState("");
  const [activeBet, setActiveBet] = useState(0);

  useEffect(() => {
    localStorage.setItem("treasureHuntBalance", String(balance));
  }, [balance]);

  function startGame() {
    if (gameStatus === "playing") {
      setErr("Finish the round or Cash Out before starting new Round!");
      return;
    }
    if (betAmount === 0) {
      setErr("Please Bet Something!");
      return;
    }
    if (betAmount < 0) {
      setErr("Please Bet Positive Amount!");
      return;
    }
    if (betAmount > balance) {
      setErr("Not Enough Amount in Your balance!");
      return;
    }
    setErr("");

    setActiveBet(betAmount);

    setRoundId((prev) => prev + 1);
    setBalance(balance - betAmount);
    setCurrentRow(0);
    setCurrentMultiplier(1);
    setGameStatus("playing");

    const newRows = Array.from(
      { length: difficultyConfig[difficulty].rowCount },
      (_, i) => {
        return {
          cards: generateRowCards(6, difficultyConfig[difficulty].skull),
        };
      },
    );
    setRows(newRows);
  }

  const handleCardFlip = (type) => {
    if (type === "skull") {
      setGameStatus("lost");
      setRowLocked(true);
      return;
    }
    if (currentRow === difficultyConfig[difficulty].rowCount - 1) {
      const finalMultiplier = getRowMultiplier(difficulty, currentRow);
      setCurrentMultiplier(finalMultiplier);
      setBalance(balance + activeBet * finalMultiplier);
      setGameStatus("won");
      setRowLocked(true);
      return;
    }
    setRowLocked(true);
    setCurrentMultiplier(getRowMultiplier(difficulty, currentRow));
    setCurrentRow(currentRow + 1);
    setRowLocked(false);
  };

  const handleCashOut = () => {
    setGameStatus("cashed");
    setBalance(balance + activeBet * currentMultiplier);
  };

  return (
    <div>
      <Header />
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        gameStatus={gameStatus}
      />

      <div className="flex justify-center my-5">
        <div className="inline-flex w-95 justify-around items-center border p-3 bg-[#060D17] rounded-lg border-t-2 border-l border-r border-b-0 border-[#FDC932]">
          <BetInput
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            gameStatus={gameStatus}
          />

          <button
            onClick={() => {
              setRowLocked(false);
              startGame();
            }}
            className="p-2 rounded-lg flex gap-2 bg-[#FDC932] font-bold text-[#4E2705]"
          >
            <Play fill="#461D00" strokeWidth={0} />
            Start Game
          </button>
        </div>
      </div>

      <StatusBar
        balance={balance}
        gameStatus={gameStatus}
        activeBet={activeBet}
        currentMultiplier={currentMultiplier}
        difficulty={difficulty}
        currentRow={currentRow}
      />

      {err && <p>{err}</p>}

      {rows.map((row, index) => {
        const rowMultiplier = getRowMultiplier(difficulty, index);
        return (
          <CardRow
            key={`${roundId}-${index}`}
            cards={row.cards}
            isActive={index === currentRow}
            onCardFlip={handleCardFlip}
            rowLocked={rowLocked}
            roundId={roundId}
            gameStatus={gameStatus}
            rowMultiplier={rowMultiplier}
          />
        );
      })}

      <button
        onClick={handleCashOut}
        disabled={gameStatus !== "playing" || currentRow === 0}
      >
        CashOut
      </button>
    </div>
  );
}

export default Game;
