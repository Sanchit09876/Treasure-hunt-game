import React from "react";
import { getRowMultiplier } from "../utils/gameLogic";
import { WalletCards } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";

const StatusBar = ({
  balance,
  gameStatus,
  currentMultiplier,
  difficulty,
  currentRow,
  activeBet,
}) => {
  // const previewMultiplier = getRowMultiplier(difficulty, currentRow);
  return (
    <div className="flex justify-center">
      <div className="inline-flex gap-5 border p-2 rounded-lg bg-[#060D17] border-t-2 border-l border-r border-b-0 border-[#FDC932]">
        <div className="flex items-center gap-2">
          <WalletCards stroke="#FCC732" size={30}/>
          <div className="flex flex-col items-center">
          <p className="text-[14px] font-[Barlow_Condensed] text-gray-500">BALANCE</p>
          <p className="font-bold text-[#FCC732]"><span className="text-[18px]">$</span>{balance.toFixed(2)}</p>
        </div>
        </div>

        <div className="flex items-center gap-2">
          <CircleDollarSign stroke="#FCC732" size={30}/>
          <div className="flex flex-col items-center">
          <p className="text-[14px] font-[Barlow_Condensed] text-gray-500">BET AMOUNT</p>
          <p className="font-bold text-[#FCC732]"><span className="text-[18px]">$</span>{activeBet.toFixed(2)}</p>
        </div>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp stroke="#FCC732" size={30}/>
        <div className="flex flex-col items-center">
          <p className="text-[14px] font-[Barlow_Condensed] text-gray-500">CURRENT MULTIPLIER</p>
          <p className="font-bold text-[#FCC732]">{currentMultiplier}X</p>
        </div>
        </div>

        <div className="flex items-center gap-2">
          <BanknoteArrowDown stroke="#FCC732" size={30}/>
        <div className="flex flex-col items-center">
          <p className="text-[14px] font-[Barlow_Condensed] text-gray-500">CURRENT PAYOUT</p>
          <p className="font-bold text-[#FCC732]"><span className="text-[18px]">$</span>{(activeBet * currentMultiplier).toFixed(2)}</p>
        </div>
        </div>

        {/* <p>Current Difficulty: {difficulty}</p> */}
        {/* <p>Current Row Multiplier: {previewMultiplier}X </p> */}
        {gameStatus === "lost" && <p>You Loose! Try Again</p>}
        {gameStatus === "won" && <p>You Win! Congratulations!!!</p>}
        {gameStatus === "cashed" && (
          <p>You cashed ${(activeBet * currentMultiplier).toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};

export default StatusBar;
