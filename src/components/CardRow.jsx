import React from "react";
import Card from "./Card";

const CardRow = ({ cards, isActive, onCardFlip, rowLocked, roundId, gameStatus }) => {
  return (
    <div
      className={`flex gap-1 mb-2-2 ${isActive ? "bg-yellow-300" : "bg-gray-500 opacity-75"}`}
    >
      {cards.map((type, index) => {
        return <Card key={`${roundId}-${index}`} type={type} isActive={isActive} onCardFlip={onCardFlip} rowLocked={rowLocked} gameStatus={gameStatus} />;
      })}
    </div>
  );
};

export default CardRow;
