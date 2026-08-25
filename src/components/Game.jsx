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
import SpecularButton from "./SpecularButton";
import ResultBanner from "./ResultBanner";

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
        <SpecularButton
          size="sm"
          radius={8}
          tint="#ffffff"
          tintOpacity={0}
          blur={0}
          textColor="#f5f5f5"
          lineColor="#ffcd00"
          baseColor="#000000"
          intensity={1.35}
          shineSize={25}
          shineFade={40}
          thickness={1.5}
          speed={1.35}
          followMouse={false}
          proximity={250}
          autoAnimate={true}
        >
          <div className="inline-flex w-95 justify-around items-center p-3 bg-linear-to-t from-[#060D17] to-[#091529] rounded-lg ">
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
              className="p-2 rounded-lg flex items-center gap-2 bg-[#FDC932] font-bold text-[#4E2705] hover:bg-linear-to-t from-[#ddb12d] to-[#FDC932] transition-transform duration-80 ease-in active:scale-95"
            >
              <Play fill="#461D00" strokeWidth={0} />
              Start Game
            </button>
          </div>
        </SpecularButton>
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
        className="text-white"
      >
        CashOut
      </button>
      <ResultBanner
        gameStatus={gameStatus}
        currentRow={currentRow}
        activeBet={activeBet}
        currentMultiplier={currentMultiplier}
      />
    </div>
  );
}

export default Game;
