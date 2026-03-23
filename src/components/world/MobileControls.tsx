"use client";

import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [showJoystick, setShowJoystick] = useState(false);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  
  const setMove = useStore((state) => state.setMove);
  const thumbRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const check = () => {
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        setIsPortrait(window.innerHeight > window.innerWidth);
      };
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);

  if (!isMobile) return null;

  // --- 1. ORIENTATION LOCK OVERLAY ---
  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-[600] bg-stone-950 flex flex-col items-center justify-center p-10 text-center">
        <div className="w-16 h-10 border-2 border-orange-500 rounded-lg animate-bounce mb-4 flex items-center justify-center">
            <span className="text-orange-500 text-xs">➔</span>
        </div>
        <h2 className="text-white font-bold uppercase tracking-widest text-sm">Rotate for Landscape</h2>
      </div>
    );
  }

  // --- 2. DYNAMIC JOYSTICK LOGIC ---
  const handleLeftTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch.clientX > window.innerWidth / 2) return;
    setJoystickPos({ x: touch.clientX, y: touch.clientY });
    setShowJoystick(true);
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!thumbRef.current) return;
    const touch = e.touches[0];
    let dx = touch.clientX - joystickPos.x;
    let dy = touch.clientY - joystickPos.y;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = 50;
    
    if (distance > maxRadius) {
      dx *= maxRadius / distance;
      dy *= maxRadius / distance;
    }

    thumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;

    const threshold = 10;
    setMove("forward", dy < -threshold);
    setMove("backward", dy > threshold);
    setMove("left", dx < -threshold);
    setMove("right", dx > threshold);
  };

  const resetJoystick = () => {
    setShowJoystick(false);
    setMove("forward", false);
    setMove("backward", false);
    setMove("left", false);
    setMove("right", false);
  };

  // --- 3. LOOK AROUND LOGIC ---
  const handleLookMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch.clientX < window.innerWidth / 2) return;

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
    <div className="fixed inset-0 z-[150] pointer-events-none select-none touch-none">
      
      {/* LEFT HALF (Joystick Trigger) */}
      <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-auto"
           onTouchStart={handleLeftTouchStart} onTouchMove={handleJoystickMove} onTouchEnd={resetJoystick} />

      {/* RIGHT HALF (Look Area) */}
      <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-auto"
           onTouchStart={(e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
           onTouchMove={handleLookMove} />

      {/* JOYSTICK VISUAL */}
      <div 
        style={{ left: joystickPos.x, top: joystickPos.y, opacity: showJoystick ? 1 : 0, transform: 'translate(-50%, -50%)' }}
        className="absolute w-28 h-28 rounded-full bg-stone-900/40 border-2 border-white/10 backdrop-blur-md flex items-center justify-center transition-opacity"
      >
        <div ref={thumbRef} className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl border border-orange-300/30 transition-transform duration-75" />
      </div>

      {/* FIXED JUMP BUTTON */}
      <div className="absolute bottom-10 right-10 pointer-events-auto">
        <button 
          onPointerDown={() => setMove("jump", true)} onPointerUp={() => setMove("jump", false)}
          className="w-20 h-20 rounded-full bg-orange-600/20 border-2 border-orange-500/50 flex items-center justify-center active:bg-orange-600 active:scale-90 transition-all"
        >
          <span className="text-orange-500 font-black text-[10px] uppercase active:text-white">Jump</span>
        </button>
      </div>
    </div>
  );
}
