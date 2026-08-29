import React from "react";
import { Skull } from "lucide-react";
import skull from "../assets/skull.png";
import goldCoins from "../assets/gold_coins.png";
import trophy from "../assets/trophy.png";

const ResultBanner = ({
  gameStatus,
  currentRow,
  activeBet,
  currentMultiplier,
  visible,
}) => {
  const winText = "YOU WIN!";
  const lossText = "YOU LOSE!";
  const cashedText = "CASHED OUT!";
  return (
    // <div className="flex justify-center">
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-400 flex items-center justify-center pointer-events-none transition-all duration-500 ease-out w-full px-2 sm:w-auto sm:px-0 ${
        visible
          ? "opacity-100 translate-y-[-50%]"
          : "opacity-0 translate-y-[calc(-50%+10rem)]"
      }`}
    >
      {gameStatus === "won" ||
      gameStatus === "lost" ||
      gameStatus === "cashed" ? (
        <div className="p-2 ">
          {/* Win State */}
          {gameStatus === "won" && (
            <div className="flex items-center gap-1.5 rounded-lg px-6 py-1 bg-linear-to-t from-green-500 from-5% to-[#060D17] to-60% border-t-2 border-green-500">
              <div className="border p-2 rounded-lg bg-green-400">
                <img src={trophy} className="h-10" />
              </div>
              <div className="flex flex-col items-center text-green-400">
                <p className="font-bold">{winText}</p>
                <p>Cashed Out at {currentMultiplier}x</p>
                <p className="font-medium text-[18px]">
                  +${currentMultiplier * activeBet}
                </p>
              </div>
            </div>
          )}

          {/* Lost State */}
          {gameStatus === "lost" && (
            <div className="flex items-center gap-1.5 rounded-lg px-6 py-1 bg-linear-to-t from-red-900 from-5% to-[#060D17] to-60% border-t-2 border-red-900">
              <div className="p-2 rounded-lg bg-red-600">
                <img src={skull} className="h-10" />
              </div>
              <div className="flex flex-col items-center text-red-700">
                <p className="font-bold">{lossText}</p>
                <p>Hit a skull on Row {currentRow + 1}</p>
                <p className="font-medium text-[18px] text-red-600">
                  -${activeBet}
                </p>
              </div>
            </div>
          )}

          {/* Cashed Out State */}
          {gameStatus === "cashed" && (
            <div className="flex items-center gap-1.5 rounded-lg px-6 py-1 bg-linear-to-t from-yellow-200 from-5% to-[#060D17] to-60% border-t-2 border-yellow-200">
              <div className="p-2 rounded-lg bg-[#FDC700]">
                <img src={goldCoins} className="h-10" />
              </div>
              <div className="flex flex-col items-center text-yellow-500">
                <p className="font-bold">{cashedText}</p>
                <p>Cashed Out at {currentMultiplier}x</p>
                <p className="font-medium text-[18px] text-green-900">
                  +${(currentMultiplier * activeBet).toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ResultBanner;
