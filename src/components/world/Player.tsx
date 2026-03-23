"use client";

import React, { useEffect, useState } from "react";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the user is on a touch device
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
  }, []);

  if (!isMobile) return null;

  // Function to simulate key presses for useKeyboardControls
  const handleTouch = (key: string, active: boolean) => {
    const event = new KeyboardEvent(active ? "keydown" : "keyup", { code: key });
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed bottom-10 left-10 z-[150] flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity select-none">
      {/* UP */}
      <button 
        onTouchStart={() => handleTouch("KeyW", true)}
        onTouchEnd={() => handleTouch("KeyW", false)}
        className="w-16 h-16 bg-stone-900/50 border border-stone-800 rounded-full flex items-center justify-center active:bg-orange-600"
      >
        <span className="text-white">▲</span>
      </button>

      <div className="flex gap-2">
        {/* LEFT */}
        <button 
          onTouchStart={() => handleTouch("KeyA", true)}
          onTouchEnd={() => handleTouch("KeyA", false)}
          className="w-16 h-16 bg-stone-900/50 border border-stone-800 rounded-full flex items-center justify-center active:bg-orange-600"
        >
          <span className="text-white">◀</span>
        </button>
        {/* DOWN */}
        <button 
          onTouchStart={() => handleTouch("KeyS", true)}
          onTouchEnd={() => handleTouch("KeyS", false)}
          className="w-16 h-16 bg-stone-900/50 border border-stone-800 rounded-full flex items-center justify-center active:bg-orange-600"
        >
          <span className="text-white">▼</span>
        </button>
        {/* RIGHT */}
        <button 
          onTouchStart={() => handleTouch("KeyD", true)}
          onTouchEnd={() => handleTouch("KeyD", false)}
          className="w-16 h-16 bg-stone-900/50 border border-stone-800 rounded-full flex items-center justify-center active:bg-orange-600"
        >
          <span className="text-white">▶</span>
        </button>
      </div>

      {/* JUMP BUTTON (Right Side) */}
      <button 
        onTouchStart={() => handleTouch("Space", true)}
        onTouchEnd={() => handleTouch("Space", false)}
        className="fixed bottom-10 right-10 w-20 h-20 bg-orange-600/20 border border-orange-600/50 rounded-full flex items-center justify-center font-black text-orange-500 active:bg-orange-600 active:text-white"
      >
        JUMP
      </button>
    </div>
  );
}
