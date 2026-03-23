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
      {/* Look Surface */}
      <div className="absolute inset-0 pointer-events-auto" onTouchStart={handleLookStart} onTouchMove={handleLookMove} />

      {/* D-PAD */}
      <div className="absolute bottom-10 left-10 flex flex-col items-center gap-2 pointer-events-auto opacity-60">
        <button onPointerDown={() => setMove("forward", true)} onPointerUp={() => setMove("forward", false)} className="w-16 h-16 bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center active:bg-orange-600 text-white">▲</button>
        <div className="flex gap-2">
          <button onPointerDown={() => setMove("left", true)} onPointerUp={() => setMove("left", false)} className="w-16 h-16 bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center active:bg-orange-600 text-white">◀</button>
          <button onPointerDown={() => setMove("backward", true)} onPointerUp={() => setMove("backward", false)} className="w-16 h-16 bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center active:bg-orange-600 text-white">▼</button>
          <button onPointerDown={() => setMove("right", true)} onPointerUp={() => setMove("right", false)} className="w-16 h-16 bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center active:bg-orange-600 text-white">▶</button>
        </div>
      </div>

      {/* JUMP */}
      <button onPointerDown={() => setMove("jump", true)} onPointerUp={() => setMove("jump", false)} className="absolute bottom-10 right-10 w-24 h-24 bg-orange-600/20 border-2 border-orange-600/50 rounded-full flex items-center justify-center font-black text-orange-500 pointer-events-auto active:bg-orange-600 active:text-white">JUMP</button>
    </div>
  );
}
