import React from "react";
import difficultyConfig from "../data/difficultyConfig";
import SpecularButton from "./SpecularButton";

const DifficultySelector = ({ setDifficulty, difficulty, gameStatus }) => {
  const buttonStyle = {
    easy: {
      base: "bg-gradient-to-b from-green-700 to-green-900 border-green-500 text-green-100",
      glow: "shadow-[0_0_15px_rgba(34,197,94,0.6)]",
      scale: "scale-110",
    },
    medium: {
      base: "bg-gradient-to-b from-yellow-700 to-yellow-900 border-yellow-500 text-yellow-100",
      glow: "shadow-[0_0_15px_rgba(234,179,8,0.6)]",
      scale: "scale-110",
    },
    hard: {
      base: "bg-gradient-to-b from-orange-600 to-orange-900 border-orange-400 text-orange-100",
      glow: "shadow-[0_0_18px_rgba(251,146,60,0.8)]",
      scale: "scale-110",
    },
    extreme: {
      base: "bg-gradient-to-b from-red-700 to-red-950 border-red-500 text-red-100",
      glow: "shadow-[0_0_15px_rgba(239,68,68,0.6)]",
      scale: "scale-110",
    },
  };

  return (
    <div className="flex justify-center items-center">
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
        <div className="grid grid-cols-2 sm:flex gap-3 rounded-lg p-5 bg-linear-to-t from-[#060D17] to-[#091529]">
          {Object.keys(difficultyConfig).map((name) => {
            const selectedDiff =
              name === difficulty ? `${buttonStyle[name].scale} ${buttonStyle[name].glow}` : "";
            return (
              <button
                key={name}
                onClick={() => setDifficulty(name)}
                disabled={gameStatus === "playing"}
                className={`py-1 px-5 border rounded-lg font-medium ${buttonStyle[name].base} ${selectedDiff} transition-transform duration-80 ease-in active:scale-95 text-transform: uppercase`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </SpecularButton>
    </div>
  );
};

export default DifficultySelector;
