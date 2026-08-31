import React from "react";
import Card from "./Card";
import { forwardRef } from "react";
import { BanknoteArrowDown } from "lucide-react";

const CardRow = forwardRef(
  (
    {
      cards,
      isActive,
      onCardFlip,
      rowLocked,
      roundId,
      gameStatus,
      rowMultiplier,
      rowNumber,
      onCashOut,
      currentRow,
      activeBet,
      currentMultiplier,
    },
    ref,
  ) => {
    const isDisabled = rowNumber - 1 !== currentRow - 1;
    return (
      <div ref={ref} className="flex justify-center w-full">
        <div
          className={`flex items-center gap-1 sm:gap-2 px-1 sm:px-3 py-3 mb-1 rounded-lg ${isActive ? "bg-yellow-200" : "bg-gray-500/70"}`}
          >
          <div
            className={`w-8 lg:w-15 ${isActive ? "text-yellow-600" : "text-gray-800"} flex flex-col items-center`}
          >
            <p className="font-[Barlow_Condensed] text-[12px]">ROW {rowNumber}</p>
            <p className="text-[14px] lg:text-2xl font-medium">{rowMultiplier}x</p>
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
          <div>
            <button
              onClick={onCashOut}
              disabled={isDisabled || gameStatus !== "playing"}
              className={`${isDisabled ? "bg-gray-500" : "bg-linear-to-t from-[#044017] to-[#158845] border-2 border-[#1B6435]"} text-white px-1 sm:px-4 md:px-6 py-2 rounded-lg flex gap-3 items-center  transition-transform duration-80 ease-in active:scale-95`}
            >
              <div>
              <BanknoteArrowDown className="size-[clamp(20px,5vw,28px)]" stroke={isDisabled ? "#9ca3af" : "#46ab4e"}/>
              </div>
              <div className="hidden lg:block">
              CASH OUT
              {(!isDisabled && activeBet !== 0) && (
                <p className="text-[#46ab4e] text-[18px] font-bold">
                  ${(activeBet * currentMultiplier).toFixed(2)}
                </p>
              )}
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default CardRow;
