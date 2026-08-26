import React from "react";
import { AlertTriangleIcon } from "lucide-react";
import errorBorder from "../assets/error_border.png";

const ErrorBanner = ({ err }) => {
  return (
    <div>
      {err && (
        <div className="flex justify-center">
          <div className="relative z-100 pointer-events-none">
            <img src={errorBorder} className="w-85 h-29" />
          </div>
          <div className="absolute">
            <div className="w-80 h-18 flex justify-center items-center gap-4 mt-4 rounded-lg bg-red-950 shadow-[inset_0_0_12px_4px_rgba(0,0,0,0.7)]">
              <div className="w-10">
                <AlertTriangleIcon stroke="red" size={35} />
              </div>
              <div className="flex flex-col w-50">
                <p className="font-bold text-yellow-400 text-center font-[Oswald]">{err}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorBanner;
