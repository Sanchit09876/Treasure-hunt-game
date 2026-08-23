import React from "react";
import difficultyConfig from "../data/difficultyConfig";

const DifficultySelector = ({ setDifficulty, difficulty, gameStatus }) => {
  return (
    <div>
      {Object.keys(difficultyConfig).map((name) => (
        <button
          key={name}
          onClick={() => setDifficulty(name)}
          disabled={gameStatus === "playing"}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
