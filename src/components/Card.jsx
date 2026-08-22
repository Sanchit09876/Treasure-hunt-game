import React from "react";
import { useState } from "react";
import questionMark from "../assets/question_mark.png";
import goldCoins from "../assets/gold_coins.png";
import skull from "../assets/skull.png";

const Card = ({ type, isActive, onCardFlip, rowLocked }) => {
  const [flipped, setFlipped] = useState(false);

  const revealImage = type === "skull" ? skull : goldCoins;
  const revealBg = type === "skull" ? "bg-red-400" : "bg-yellow-400";
  return (
    <div>
      <div
        className={`h-20 w-20 rounded-lg flex justify-center items-center ${flipped ? revealBg : "bg-gray-400"} transition-transform transform-[rotateY(180deg)]`}
        onClick={() => {
          if (!isActive || rowLocked) {
            return;
          }
          setFlipped(true);
          onCardFlip(type);
          
        }}
      >
        {flipped ? (
          <>
            <img src={revealImage} />
          </>
        ) : (
          <>
            <img
              src={questionMark}
              className="h-15 w-12 transform-[rotateY(180deg)]"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
