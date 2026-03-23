"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setShown(false), 800);
      return () => clearTimeout(timer);
    }
  }, [progress, active]);

  if (!shown) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000 ${!active ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] -z-10" />

      <div className="flex flex-col items-center justify-center space-y-8">
        
        {/* --- CENTRAL LOADING CIRCLE --- */}
        <div className="relative flex items-center justify-center w-32 h-32">
          {/* Static Background Ring */}
          <svg className="absolute w-full h-full rotate-[-90deg]">
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-stone-900"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={377}
              strokeDashoffset={377 - (377 * progress) / 100}
              strokeLinecap="round"
              className="text-orange-600 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(234,88,12,0.5)]"
            />
          </svg>

          {/* Percentage in Center */}
          <div className="flex flex-col items-center">
            <span className="text-white font-mono text-xl font-black tracking-tighter">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* --- STATUS TEXT --- */}
        <div className="text-center space-y-2">
          <p className="text-orange-500 font-sans text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">
            {active ? "Initialising Grid" : "System Ready"}
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-4 bg-stone-800" />
            <p className="text-stone-600 font-sans text-[7px] uppercase tracking-[0.3em]">
              Node: ARC-V1 • Valenzuela
            </p>
            <div className="h-[1px] w-4 bg-stone-800" />
          </div>
        </div>

      </div>
    </div>
  );
}
