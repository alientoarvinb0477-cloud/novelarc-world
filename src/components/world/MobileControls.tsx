"use client";

import React, { useEffect, useState, useRef } from "react";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
      };
      checkMobile();
    }
  }, []);

  if (!isMobile) return null;

  const handleTouch = (key: string, active: boolean) => {
    const event = new KeyboardEvent(active ? "keydown" : "keyup", { 
      code: key,
      bubbles: true 
    });
    window.dispatchEvent(event);
  };

  // --- TOUCH DRAG LOGIC ---
  const handleLookStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleLookMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    // Reset start point for smooth continuous movement
    touchStart.current = { x: touch.clientX, y: touch.clientY };

    // We simulate a MouseMove event so the camera rotation logic picks it up
    const moveEvent = new MouseEvent("mousemove", {
      movementX: deltaX * 1.5, // Sensitivity multiplier
      movementY: deltaY * 1.5,
      bubbles: true
    });
    window.dispatchEvent(moveEvent);
  };

  return (
    <div className="fixed inset-0 z-[150] select-none pointer-events-none">
      
      {/* 1. TOUCH DRAG SURFACE (Invisible area for looking around) */}
      <div 
        className="absolute inset-0 pointer-events-auto"
        onTouchStart={handleLookStart}
        onTouchMove={handleLookMove}
      />

      {/* 2. D-PAD (Bottom Left) */}
      <div className="absolute bottom-10 left-10 flex flex-col items-center gap-2 pointer-events-auto opacity-50">
        <button 
          onTouchStart={(e) => { e.stopPropagation(); handleTouch("KeyW", true); }}
          onTouchEnd={() => handleTouch("KeyW", false)}
          className="w-16 h-16 bg-stone-900/80 border border-stone-800 rounded-full flex items-center justify-center active:bg-orange-600"
        >
          <span className="text-white">▲</span>
        </button>

        <div className="flex gap-2">
          <button 
            onTouchStart={(e) => { e.stopPropagation(); handleTouch("KeyA", true); }}
            onTouchEnd={() => handleTouch("KeyA", false)}
            className="w-16 h-16 bg-stone-900/80 border border-stone-800 rounded-full flex items-center justify-center active:bg-orange-600"
          >
            <span className="text-white">◀</span>
          </button>
          <button 
            onTouchStart={(e) => { e.stopPropagation(); handleTouch("KeyS", true); }}
            onTouchEnd={() => handleTouch("KeyS", false)}
            className="w-16 h-16 bg-stone-900/80 border border-stone-800 rounded-full flex items-center justify-center active:bg-orange-600"
          >
            <span className="text-white">▼</span>
          </button>
          <button 
            onTouchStart={(e) => { e.stopPropagation(); handleTouch("KeyD", true); }}
            onTouchEnd={() => handleTouch("KeyD", false)}
            className="w-16 h-16 bg-stone-900/80 border border-stone-800 rounded-full flex items-center justify-center active:bg-orange-600"
          >
            <span className="text-white">▶</span>
          </button>
        </div>
      </div>

      {/* 3. JUMP BUTTON (Bottom Right) */}
      <button 
        onTouchStart={(e) => { e.stopPropagation(); handleTouch("Space", true); }}
        onTouchEnd={() => handleTouch("Space", false)}
        className="absolute bottom-10 right-10 w-24 h-24 bg-orange-600/20 border-2 border-orange-600/50 rounded-full flex items-center justify-center font-black text-orange-500 pointer-events-auto active:bg-orange-600 active:text-white"
      >
        JUMP
      </button>

    </div>
  );
}
