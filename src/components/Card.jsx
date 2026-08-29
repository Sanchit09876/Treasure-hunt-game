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
        className={`h-[clamp(32px,14vw,92px)] w-[clamp(26px,11vw,72px)] rounded-lg flex justify-center items-center ${flipped ? revealBg : "bg-[#13181F]"} transition-transform ${flipped ? "transform-[rotateY(180deg)]" : ""} hover:cursor-help`}
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
            <img src={revealImage} className="h-[clamp(25px,9vw,65px)] w-[clamp(25px,7vw,62px)] "/>
          </>
        ) : (
          <>
            {isActive ? (
              <img
                src={questionMark}
                className="h-[clamp(25px,9vw,60px)] w-[clamp(18px,7vw,48px)] "
              />
            ) : (
              <img
                src={grayQuestionMark}
                className="h-[clamp(25px,9vw,60px)] w-[clamp(18px,7vw,48px)]"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
