"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setShown(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [progress, active]);

  if (!shown) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${!active ? 'opacity-0' : 'opacity-100'}`}>
      
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* --- CENTRAL ANIMATION: THE 'SCANNER' --- */}
        <div className="absolute w-full h-full border border-stone-900 rounded-full animate-[spin_4s_linear_infinite]" />
        <div className="absolute w-[80%] h-[80%] border border-orange-900/30 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
        
        {/* The "Walking" Dot / Human Placeholder */}
        <div className="flex flex-col items-center gap-2">
           <div className="w-1 h-8 bg-orange-600 animate-bounce" />
           <div className="w-4 h-1 bg-orange-600/50 blur-[2px] animate-pulse" />
        </div>
      </div>

      {/* --- STATUS TEXT --- */}
      <div className="mt-12 w-72 space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-orange-500 font-sans text-[9px] font-black uppercase tracking-[0.4em]">
            {active ? "Initialising Grid" : "System Ready"}
          </span>
          <span className="text-stone-500 font-mono text-[10px]">
            {Math.round(progress)}%
          </span>
        </div>

        {/* --- PROGRESS BAR --- */}
        <div className="w-full h-[1px] bg-stone-900 relative">
          <div 
            className="absolute h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Scanning light that runs across the bar */}
          <div className="absolute h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
        </div>

        <p className="text-stone-700 font-sans text-[7px] uppercase tracking-[0.2em] text-center">
          Sector: Valenzuela • Node: ARC-V1
        </p>
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] -z-10" />
    </div>
  );
}
