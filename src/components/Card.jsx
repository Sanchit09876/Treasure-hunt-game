import React from "react";
import { useState } from "react";
import questionMark from "../assets/question_mark.png";
import goldCoins from "../assets/gold_coins.png";
import skull from "../assets/skull.png";
import grayQuestionMark from "../assets/gray_question_mark.png";

const Card = ({ type, isActive, onCardFlip, rowLocked, gameStatus }) => {
  const [flipped, setFlipped] = useState(false);

  const revealImage = type === "skull" ? skull : goldCoins;
  const revealBg = type === "skull" ? "bg-red-600" : "bg-yellow-400";
  return (
    <div>
      <div
        className={`h-23 w-18 rounded-lg flex justify-center items-center ${flipped ? revealBg : "bg-[#13181F]"} transition-transform ${flipped ? "transform-[rotateY(180deg)]" : ""}`}
        onClick={() => {
          if (!isActive || rowLocked || gameStatus !== "playing") {
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
            {isActive ? (
              <img src={questionMark} className="h-15 w-12 " />
            ) : (
              <img src={grayQuestionMark} className="h-15 w-12 " />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
