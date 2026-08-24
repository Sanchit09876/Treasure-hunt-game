import React from "react";
import Card from "./Card";

const CardRow = ({
  cards,
  isActive,
  onCardFlip,
  rowLocked,
  roundId,
  gameStatus,
  rowMultiplier,
}) => {
  return (
    <div className="flex justify-center">
      <div
        className={`flex items-center gap-2 px-4 py-3 mb-1 rounded-lg ${isActive ? "bg-yellow-100" : "bg-gray-500 opacity-75"}`}
      >
        <div
          className={`w-15 text-2xl font-medium ${isActive ? "text-yellow-600" : "text-gray-800"}`}
        >
          {rowMultiplier}x
        </div>
        {cards.map((type, index) => {
          return (
            <Card
              key={`${roundId}-${index}`}
              type={type}
              isActive={isActive}
              onCardFlip={onCardFlip}
              rowLocked={rowLocked}
              gameStatus={gameStatus}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardRow;
