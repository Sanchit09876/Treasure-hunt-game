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

import bgMusic from "../assets/game_music.mp3";
import cardFlipSound from "../assets/card_flip_soundEffect.mp3";
import gameOverSound from "../assets/gameOver_soundEffect.mp3";
import winSound from "../assets/win_soundEffect.mp3";
import cashoutSound from "../assets/cashout_soundEffect.mp3";

function useBackgroundMusic(volume) {
  const musicRef = useRef(null);

  useEffect(() => {
    const music = new Audio(bgMusic);
    music.loop = true;
    music.volume = volume;
    musicRef.current = music;

    return () => {
      music.pause();
      music.src = "";
    };
  }, []);
  return musicRef;
}

function useCardFlipSound(volume) {
  const flipSoundRef = useRef(null);

  useEffect(() => {
    const cardFlip = new Audio(cardFlipSound);
    cardFlip.loop = false;
    cardFlip.volume = volume;
    flipSoundRef.current = cardFlip;

    return () => {
      cardFlip.pause();
      cardFlip.src = "";
    };
  }, []);
  return flipSoundRef;
}

function useGameOverSound(volume) {
  const gameOverRef = useRef(null);

  useEffect(() => {
    const gameOver = new Audio(gameOverSound);
    gameOver.loop = false;
    gameOver.volume = volume;
    gameOverRef.current = gameOver;

    return () => {
      gameOver.pause();
      gameOver.src = "";
    };
  }, []);
  return gameOverRef;
}

function useWinSound(volume) {
  const winSoundRef = useRef(null);

  useEffect(() => {
    const winSoundEffect = new Audio(winSound);
    winSoundEffect.loop = false;
    winSoundEffect.volume = volume;
    winSoundRef.current = winSoundEffect;
    return () => {
      winSoundEffect.pause();
      winSoundEffect.src = "";
    };
  }, []);
  return winSoundRef;
}

function useCashoutSound(volume) {
  const cashOutRef = useRef(null);

  useEffect(() => {
    const CashoutSoundEffect = new Audio(cashoutSound);
    CashoutSoundEffect.loop = false;
    CashoutSoundEffect.volume = volume;
    cashOutRef.current = CashoutSoundEffect;
    return () => {
      CashoutSoundEffect.pause();
      CashoutSoundEffect.src = "";
    };
  }, []);
  return cashOutRef;
}

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
  const [showResult, setShowResult] = useState(false);

  const musicRef = useBackgroundMusic(0.05);
  const flipSoundRef = useCardFlipSound(0.35);
  const gameOverRef = useGameOverSound(0.25);
  const winSoundRef = useWinSound(0.75);
  const cashOutRef = useCashoutSound(0.75);

  useEffect(() => {
    localStorage.setItem("treasureHuntBalance", String(balance));
  }, [balance]);

  const rowRefs = useRef([]);

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
    return () => clearTimeout(timer);
  }, [err]);

  useEffect(() => {
    if (
      gameStatus === "won" ||
      gameStatus === "lost" ||
      gameStatus === "cashed"
    ) {
      const showTimer = setTimeout(() => setShowResult(true), 300);
      const hideTimer = setTimeout(() => setShowResult(false), 3000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
    setShowResult(false);
  }, [gameStatus]);

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

    if (musicRef.current?.paused) {
      musicRef.current.play().catch(() => {});
    }

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
    if (flipSoundRef.current) {
      flipSoundRef.current.currentTime = 0; //resets the sound to the very start
      flipSoundRef.current.play().catch(() => {}); //.play() plays the sound while .catch() silently ignores autoplay-block errors
    }
    if (type === "skull") {
      setGameStatus("lost");
      setRowLocked(true);
      gameOverRef.current.currentTime = 0;
      gameOverRef.current.play().catch(() => {});
      return;
    }
    if (currentRow === difficultyConfig[difficulty].rowCount - 1) {
      const finalMultiplier = getRowMultiplier(difficulty, currentRow);
      setCurrentMultiplier(finalMultiplier);
      setBalance(balance + activeBet * finalMultiplier);
      setGameStatus("won");
      setRowLocked(true);
      winSoundRef.current.currentTime = 0;
      winSoundRef.current.play().catch(()=>{});
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
    cashOutRef.current.currentTime = 0;
    cashOutRef.current.play().catch(() => {});
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col justify-center md:flex-row md:gap-4">
        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          gameStatus={gameStatus}
        />

        <div className="flex justify-center my-4">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-around items-center p-4 bg-linear-to-t from-[#060D17] to-[#091529] rounded-lg ">
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
                className="w-full py-1.5 sm:py-2 sm:px-2 rounded-lg flex justify-center items-center gap-2 bg-[#FDC932] font-bold text-[#4E2705] hover:bg-linear-to-t from-[#ddb12d] to-[#FDC932] transition-transform duration-80 ease-in active:scale-95"
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
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${gameStatus === "idle" ? "h-0" : "h-95"} pt-5 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden 
          transition-[filter] duration-300 ease-in  ${showResult ? "blur-sm" : "blur-0"}`}
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
        <ResultBanner
          gameStatus={gameStatus}
          currentRow={currentRow}
          activeBet={activeBet}
          currentMultiplier={currentMultiplier}
          visible={showResult}
        />
      </div>
    </div>
  );
}

export default Game;
