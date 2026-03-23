"use client";

import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const setMove = useStore((state) => state.setMove);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  if (!isMobile) return null;

  // LOOK LOGIC
  const handleLookStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleLookMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = { x: touch.clientX, y: touch.clientY };

    window.dispatchEvent(new MouseEvent("mousemove", {
      movementX: deltaX * 1.5,
      movementY: deltaY * 1.5,
      bubbles: true
    }));
  };

  return (
    <div className="fixed inset-0 z-[150] select-none pointer-events-none">
      {/* Look Surface (Left side of screen for looking) */}
      <div className="absolute inset-0 pointer-events-auto" onTouchStart={handleLookStart} onTouchMove={handleLookMove} />

      {/* --- CONTROLS GROUP (Bottom Right) --- */}
      <div className="absolute bottom-6 right-6 flex flex-col items-center gap-2 pointer-events-auto opacity-60 scale-90">
        
        {/* UP */}
        <button 
          onPointerDown={() => setMove("forward", true)} 
          onPointerUp={() => setMove("forward", false)} 
          className="w-14 h-14 bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center active:bg-orange-600 text-white shadow-xl"
        >
          ▲
        </button>

        <div className="flex gap-2">
          {/* LEFT */}
          <button 
            onPointerDown={() => setMove("left", true)} 
            onPointerUp={() => setMove("left", false)} 
            className="w-14 h-14 bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center active:bg-orange-600 text-white shadow-xl"
          >
            ◀
          </button>
          {/* DOWN */}
          <button 
            onPointerDown={() => setMove("backward", true)} 
            onPointerUp={() => setMove("backward", false)} 
            className="w-14 h-14 bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center active:bg-orange-600 text-white shadow-xl"
          >
            ▼
          </button>
          {/* RIGHT */}
          <button 
            onPointerDown={() => setMove("right", true)} 
            onPointerUp={() => setMove("right", false)} 
            className="w-14 h-14 bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center active:bg-orange-600 text-white shadow-xl"
          >
            ▶
          </button>
        </div>

        {/* JUMP (Directly below D-pad) */}
        <button 
          onPointerDown={() => setMove("jump", true)} 
          onPointerUp={() => setMove("jump", false)} 
          className="mt-2 w-32 h-12 bg-orange-600/30 border border-orange-500 rounded-full flex items-center justify-center font-black text-[10px] tracking-[0.3em] text-orange-500 active:bg-orange-600 active:text-white transition-all shadow-lg"
        >
          JUMP
        </button>
      </div>
    </div>
  );
}
