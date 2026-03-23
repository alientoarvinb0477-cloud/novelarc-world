"use client";

import React, { useEffect, useState } from "react";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the user is on a touch device safely
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
      };
      checkMobile();
    }
  }, []);

  if (!isMobile) return null;

  // Function to simulate key presses for useKeyboardControls
  const handleTouch = (key: string, active: boolean) => {
    const event = new KeyboardEvent(active ? "keydown" : "keyup", { 
      code: key,
      bubbles: true 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none select-none">
      
      {/* --- D-PAD (Bottom Left) --- */}
      <div className="absolute bottom-10 left-10 flex flex-col items-center gap-2 pointer-events-auto opacity-40 active:opacity-90">
        <button 
          onTouchStart={() => handleTouch("KeyW", true)}
          onTouchEnd={() => handleTouch("KeyW", false)}
          className="w-14 h-14 bg-stone-900 border border-stone-700 rounded-xl flex items-center justify-center active:bg-orange-600"
        >
          <span className="text-white text-xs">▲</span>
        </button>

        <div className="flex gap-2">
          <button 
            onTouchStart={() => handleTouch("KeyA", true)}
            onTouchEnd={() => handleTouch("KeyA", false)}
            className="w-14 h-14 bg-stone-900 border border-stone-700 rounded-xl flex items-center justify-center active:bg-orange-600"
          >
            <span className="text-white text-xs">◀</span>
          </button>
          <button 
            onTouchStart={() => handleTouch("KeyS", true)}
            onTouchEnd={() => handleTouch("KeyS", false)}
            className="w-14 h-14 bg-stone-900 border border-stone-700 rounded-xl flex items-center justify-center active:bg-orange-600"
          >
            <span className="text-white text-xs">▼</span>
          </button>
          <button 
            onTouchStart={() => handleTouch("KeyD", true)}
            onTouchEnd={() => handleTouch("KeyD", false)}
            className="w-14 h-14 bg-stone-900 border border-stone-700 rounded-xl flex items-center justify-center active:bg-orange-600"
          >
            <span className="text-white text-xs">▶</span>
          </button>
        </div>
      </div>

      {/* --- JUMP BUTTON (Bottom Right) --- */}
      <div className="absolute bottom-10 right-10 pointer-events-auto opacity-40 active:opacity-90">
        <button 
          onTouchStart={() => handleTouch("Space", true)}
          onTouchEnd={() => handleTouch("Space", false)}
          className="w-20 h-20 bg-orange-600/20 border border-orange-600 rounded-full flex items-center justify-center font-black text-[10px] tracking-widest text-orange-500 active:bg-orange-600 active:text-white transition-colors"
        >
          JUMP
        </button>
      </div>

    </div>
  );
}
