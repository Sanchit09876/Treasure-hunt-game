import React from "react";
import difficultyConfig from "../data/difficultyConfig";

const DifficultySelector = ({ setDifficulty, difficulty, gameStatus }) => {
  const buttonStyle = {
    easy: {
      base: "bg-gradient-to-b from-green-700 to-green-900 border-green-500 text-green-100",
      glow: "shadow-[0_0_15px_rgba(34,197,94,0.6)]",
    },
    medium: {
      base: "bg-gradient-to-b from-yellow-700 to-yellow-900 border-yellow-500 text-yellow-100",
      glow: "shadow-[0_0_15px_rgba(234,179,8,0.6)]",
    },
    hard: {
      base: "bg-gradient-to-b from-orange-600 to-orange-900 border-orange-400 text-orange-100",
      glow: "shadow-[0_0_18px_rgba(251,146,60,0.8)]",
    },
    extreme: {
      base: "bg-gradient-to-b from-red-700 to-red-950 border-red-500 text-red-100",
      glow: "shadow-[0_0_15px_rgba(239,68,68,0.6)]",
    },
  };

  return (
    <div className="flex justify-center">
      <div className="inline-flex gap-2.5 mt-2.5 border rounded-lg p-4 mx-auto bg-[#060D17] border-t-2 border-l border-r border-b-0 border-[#FDC932]">
        {Object.keys(difficultyConfig).map((name) => {
          const selectedDiff =
            name === difficulty ? buttonStyle[name].glow : "";
          return (
            <button
              key={name}
              onClick={() => setDifficulty(name)}
              disabled={gameStatus === "playing"}
              className={`p-1 w-20 border rounded-2xl font-medium ${buttonStyle[name].base} ${selectedDiff}`}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySelector;
