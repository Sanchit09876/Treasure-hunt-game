import React from "react";
import { useState, useEffect, useRef } from "react";
import CardRow from "./CardRow";

import { generateRowCards, getRowMultiplier } from "../utils/gameLogic";
import difficultyConfig from "../data/difficultyConfig";
import BetInput from "./BetInput";
import StatusBar from "./StatusBar";
import DifficultySelector from "./DifficultySelector";
import Header from "./Header";
import ErrorBanner from "./ErrorBanner";

import { Play } from "lucide-react";
import SpecularButton from "./SpecularButton";
import ResultBanner from "./ResultBanner";

import Border from "../assets/border.png";

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

  const rowRefs = useRef([]);
  const topRef = useRef(null);

  useEffect(() => {
    const el = rowRefs.current[currentRow];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentRow]);

  useEffect(() => {
    if (!err) return;
    const timer = setTimeout(() => setErr(""), 3000);
  }, [err]);

  function startGame() {
    if (gameStatus === "playing") {
      setErr("FINISH THE ROUND OR CASH OUT FIRST!");
      return;
    }
    if (betAmount === 0) {
      setErr("PLEASE BET SOMETHING!");
      return;
    }
    if (betAmount < 0) {
      setErr("PLEASE BET POSITIVE AMOUNT!");
      return;
    }
    if (betAmount > balance) {
      setErr("NOT ENOUGH BALANCE IN YOUR ACCOUNT!");
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
    <div ref={topRef}>
      <Header />

      <div className="flex justify-center gap-5">
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
      </div>

      <StatusBar
        balance={balance}
        gameStatus={gameStatus}
        activeBet={activeBet}
        currentMultiplier={currentMultiplier}
        difficulty={difficulty}
        currentRow={currentRow}
      />

      <div className="mt-4">{err && <ErrorBanner err={err} />}</div>

      <div className="relative flex justify-center">
        <div className={`relative z-100 pointer-events-none`}>
          <img
            src={Border}
            alt=""
            className={`${gameStatus === "idle" ? "h-0" : "h-110"} w-205 `}
          />
        </div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${gameStatus === "idle" ? "h-0" : "h-95"} pt-5 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden`}
        >
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
                rowNumber={index + 1}
                onCashOut={handleCashOut}
                currentRow={currentRow}
                activeBet={activeBet}
                currentMultiplier={currentMultiplier}
                ref={(el) => (rowRefs.current[index] = el)}
              />
            );
          })}
        </div>
      </div>
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
