import React from "react";
import treasureChest from "../assets/TreasureChest.png";

const Header = () => {
  return (
    <div className="flex justify-center p-3">
        <div>
            <img src={treasureChest} alt="" className="h-25" />
        </div>
      <div className="">
       <svg viewBox="-30 0 360 50" width="300" height="90">
  <defs>
    <path
      id="arc-path"
      d="M -40,70 A 500,500 0 0,1 320,70"
      fill="transparent"
    />
    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stopColor="#F5EB85" />
    <stop offset="50%" stopColor="#FFDF5B" />
    <stop offset="100%" stopColor="#EEA212" />
  </linearGradient>
  </defs>
          <text fontSize="60" fill="url(#gold-gradient)" fontFamily="'Pirata One', serif">
            <textPath
              href="#arc-path"
              xlinkHref="#arc-path"
              startOffset="50%"
              textAnchor="middle"
            >
              TREASURE HUNT
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Header;
