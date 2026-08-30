import React from "react";
import {
  X,
  Gauge,
  CirclePlay,
  LayoutGrid,
  Coins,
  Skull,
  HandCoins,
  Trophy,
  Layout,
} from "lucide-react";

const HowToPlay = ({ helpDisplay, setHelpDisplay }) => {
  const rules = [
    {
      icon: Gauge,
      text: "Choose your difficulty and begin your treasure hunt, higher risks bring greater rewards.",
    },
    {
      icon: CirclePlay,
      text: "Place your bet and press Start Game to begin your voyage.",
    },
    {
      icon: LayoutGrid,
      text: "Pick one of the 6 hidden cards in each row to continue your journey.",
    },
    {
      icon: Coins,
      text: "Find a gold coin to safely clear the row and increase your multiplier.",
    },
    {
      icon: Skull,
      text: "Reveal a skull and your treasure hunt ends with your bet lost.",
    },
    {
      icon: HandCoins,
      text: "You can cash out at any time to secure your treasure, unless you reveal a skull.",
    },
    {
      icon: Trophy,
      text: "Clear every row without finding a skull to claim the maximum multiplier.",
    },
  ];

  return (
    <div>
      {helpDisplay && (
        <div className="w-60 h-120 sm:w-100 sm:h-140 md:w-130 rounded-lg text-white overflow-auto p-2 bg-[#0d1526] border-2 border-amber-500/70 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-center gap-2 py-4 border-b border-amber-500/30 bg-linear-to-b from-[#111a30] to-[#0d1526]">
            <span className="text-2xl">🏆</span>
            <h2
              className="text-amber-400 text-xl tracking-wide"
              style={{
                fontFamily: "'Pirata One', 'Cinzel', serif",
                textShadow: "1px 1px 0 #7a4a00",
              }}
            >
              HOW TO PLAY
            </h2>
          </div>
          <button
            className="absolute -top-4 -right-4 flex items-center justify-center w-8 h-8 rounded-lg bg-amber-200/90 hover:bg-red-800 transition active:scale-95"
            onClick={() => setHelpDisplay(false)}
          >
            <X stroke="red" size={35} strokeWidth={3} />
          </button>

          {rules.map((rule, index) => {
            const Icon = rule.icon;

            return (
              <div
                key={index}
                className="flex items-start gap-2 border-b  border-amber-500/20 pt-2 pr-2 pb-2"
              >
                <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <Icon stroke="#FCC732" /></div>
                <p className="text-sm md:text-[16px] text-slate-200 leading-snug text-justify font-[Pirata] font-medium">
                  {rule.text}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HowToPlay;
