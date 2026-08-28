import React from "react";
import { getRowMultiplier } from "../utils/gameLogic";
import { WalletCards } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";
import SpecularButton from "./SpecularButton";

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
      <SpecularButton
        size="sm"
        radius={8}
        tint="#ffffff"
        tintOpacity={0}
        blur={0}
        textColor="#f5f5f5"
        lineColor="#ffcd00"
        baseColor="#000000"
        intensity={1.35}
        shineSize={25}
        shineFade={40}
        thickness={1.45}
        speed={1.35}
        followMouse={false}
        proximity={250}
        autoAnimate={true}
      >
        <div className="grid grid-cols-2 juftify-center items-center sm:flex gap-5 px-2 py-3 rounded-lg bg-linear-to-t from-[#060D17] to-[#091529]">
          <div className="flex justify-center items-center gap-2 pr-6 border-r border-[#1b2a43]">
            <WalletCards stroke="#FCC732" className="size-[clamp(20px,5vw,28px)]" />
            <div className="flex flex-col items-center">
              <p className="text-[14px] font-[Barlow_Condensed] text-gray-500 mb-2">
                BALANCE
              </p>
              <p className="font-bold text-[#FCC732]">
                <span className="text-[16px]">$</span>
                {balance.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 pr-6 sm:border-r border-[#1b2a43]">
            <CircleDollarSign stroke="#FCC732" className="size-[clamp(20px,5vw,28px)]" />
            <div className="flex flex-col items-center">
              <p className="text-[14px] font-[Barlow_Condensed] text-gray-500 mb-2">
                BET AMOUNT
              </p>
              <p className="font-bold text-[#FCC732]">
                <span className="text-[16px]">$</span>
                {activeBet.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 pr-6 border-r border-[#1b2a43]">
            <TrendingUp stroke="#FCC732" className="size-[clamp(20px,5vw,28px)]" />
            <div className="flex flex-col items-center">
              <p className="text-[14px] font-[Barlow_Condensed] text-gray-500 mb-2 max-w-15">
                CURRENT MULTIPLIER
              </p>
              <p className="font-bold text-[#FCC732]">{currentMultiplier}X</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <BanknoteArrowDown stroke="#FCC732" className="size-[clamp(20px,5vw,28px)]" />
            <div className="flex flex-col items-center">
              <p className="text-[14px] font-[Barlow_Condensed] text-gray-500 mb-2 max-w-15">
                CURRENT PAYOUT
              </p>
              <p className="font-bold text-[#FCC732]">
                <span className="text-[16px]">$</span>
                {(activeBet * currentMultiplier).toFixed(2)}
              </p>
            </div>
          </div>

          {/* <p>Current Difficulty: {difficulty}</p> */}
          {/* <p>Current Row Multiplier: {previewMultiplier}X </p> */}
        </div>
      </SpecularButton>
    </div>
  );
};

export default StatusBar;
