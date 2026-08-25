import React from "react";
import Card from "./Card";
import { forwardRef } from "react";

const CardRow = forwardRef(({
  cards,
  isActive,
  onCardFlip,
  rowLocked,
  roundId,
  gameStatus,
  rowMultiplier,
  rowNumber,
},ref) => {
  return (
    <div ref={ref} className="flex justify-center">
      <div
        className={`flex items-center gap-2 px-4 py-3 mb-1 rounded-lg ${isActive ? "bg-yellow-100" : "bg-gray-500 opacity-75"}`}
      >
        <div
          className={`w-15 ${isActive ? "text-yellow-600" : "text-gray-800"} flex flex-col items-center`}
        >
          <p className="font-[Barlow_Condensed]">ROW {rowNumber}</p>
          <p className="text-2xl font-medium">{rowMultiplier}x</p>
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
});

export default CardRow;
