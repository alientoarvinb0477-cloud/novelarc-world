"use client";

import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  
  // FIXED POSITION for debugging - Bottom Left
  const [joystickPos, setJoystickPos] = useState({ x: 100, y: 0 });
  const setMove = useStore((state) => state.setMove);
  
  const joystickRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const check = () => {
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        setIsPortrait(window.innerHeight > window.innerWidth);
        // Position it 100px from left, 100px from bottom
        setJoystickPos({ x: 100, y: window.innerHeight - 100 });
      };
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);

  if (!isMobile) return null;

  // Portrait Lock
  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-10">
        <div className="w-16 h-10 border-2 border-orange-500 rounded-lg animate-bounce mb-4" />
        <h2 className="text-white font-bold uppercase text-xs">Rotate to Landscape</h2>
      </div>
    );
  }

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!thumbRef.current) return;
    const touch = e.touches[0];
    
    // Logic stays the same
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
    if (thumbRef.current) thumbRef.current.style.transform = `translate(0px, 0px)`;
    setMove("forward", false);
    setMove("backward", false);
    setMove("left", false);
    setMove("right", false);
  };

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none select-none touch-none w-full h-full">
      
      {/* JOYSTICK TRIGGER ZONE (Visible Border for Debugging) */}
      <div 
        className="absolute bottom-4 left-4 w-48 h-48 pointer-events-auto rounded-xl bg-white/5 border border-white/10"
        onTouchMove={handleJoystickMove} 
        onTouchEnd={resetJoystick} 
      />

      {/* THE JOYSTICK (Pinned to joystickPos) */}
      <div 
        style={{ 
          left: joystickPos.x, 
          top: joystickPos.y, 
          transform: 'translate(-50%, -50%)',
          position: 'absolute'
        }}
        className="w-32 h-32 rounded-full bg-stone-900/80 border-2 border-orange-500/50 flex items-center justify-center pointer-events-none shadow-2xl"
      >
        <div 
          ref={thumbRef} 
          className="w-16 h-16 rounded-full bg-orange-600 border-2 border-orange-400 shadow-xl"
        />
      </div>

      {/* JUMP BUTTON (Bottom Right) */}
      <div className="absolute bottom-12 right-12 pointer-events-auto">
        <button 
          onPointerDown={() => setMove("jump", true)} 
          onPointerUp={() => setMove("jump", false)}
          className="w-24 h-24 rounded-full bg-orange-600/40 border-2 border-orange-500 flex items-center justify-center active:scale-90 active:bg-orange-600 transition-all shadow-lg shadow-orange-900/20"
        >
          <span className="text-white font-black text-xs italic uppercase">Jump</span>
        </button>
      </div>
    </div>
  );
}
