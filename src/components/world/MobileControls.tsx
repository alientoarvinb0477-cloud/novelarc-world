"use client";

import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  
  // Start with a visible default position in the bottom left
  const [joystickPos, setJoystickPos] = useState({ x: 150, y: 0 });
  const [showJoystick, setShowJoystick] = useState(false);
  
  const setMove = useStore((state) => state.setMove);
  const thumbRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const check = () => {
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        setIsPortrait(window.innerHeight > window.innerWidth);
        // Set default Y to bottom of screen
        setJoystickPos(p => ({ ...p, y: window.innerHeight - 150 }));
      };
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);

  if (!isMobile) return null;

  // Orientation Lock
  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-[9999] bg-stone-950 flex flex-col items-center justify-center p-10 text-center">
        <div className="w-16 h-10 border-2 border-orange-500 rounded-lg animate-bounce mb-4 flex items-center justify-center">
            <span className="text-orange-500 text-xs">➔</span>
        </div>
        <h2 className="text-white font-bold uppercase tracking-widest text-sm">Rotate for Landscape</h2>
      </div>
    );
  }

  const handleLeftTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch.clientX > window.innerWidth / 2) return;
    setJoystickPos({ x: touch.clientX, y: touch.clientY });
    setShowJoystick(true);
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!thumbRef.current) return;
    const touch = e.touches[0];
    
    // Calculate distance from the point where you first touched
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
    <div className="fixed inset-0 z-[999] pointer-events-none select-none touch-none w-screen h-screen">
      
      {/* LEFT HALF (Joystick Trigger) */}
      <div 
        className="absolute inset-y-0 left-0 w-1/2 pointer-events-auto border-r border-white/5"
        onTouchStart={handleLeftTouchStart} 
        onTouchMove={handleJoystickMove} 
        onTouchEnd={resetJoystick} 
      />

      {/* RIGHT HALF (Look Area) */}
      <div 
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-auto"
        onTouchStart={(e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchMove={handleLookMove} 
      />

      {/* JOYSTICK VISUAL - Forced to top with high z-index */}
      <div 
        style={{ 
          left: joystickPos.x, 
          top: joystickPos.y, 
          opacity: showJoystick ? 1 : 0, 
          transform: 'translate(-50%, -50%)',
          zIndex: 1000 
        }}
        className="absolute w-32 h-32 rounded-full bg-stone-900/60 border-2 border-white/20 backdrop-blur-md flex items-center justify-center transition-opacity pointer-events-none"
      >
        <div 
          ref={thumbRef} 
          className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-2xl border-2 border-white/20 flex items-center justify-center transition-transform duration-75"
        >
           <div className="w-6 h-6 rounded-full bg-white/20" />
        </div>
      </div>

      {/* FIXED JUMP BUTTON - Bottom Right */}
      <div className="absolute bottom-12 right-12 pointer-events-auto z-[1001]">
        <button 
          onPointerDown={() => setMove("jump", true)} 
          onPointerUp={() => setMove("jump", false)}
          className="w-24 h-24 rounded-full bg-orange-600/40 border-2 border-orange-400 shadow-[0_0_30px_rgba(234,88,12,0.4)] flex items-center justify-center active:bg-orange-600 active:scale-90 transition-all"
        >
          <span className="text-white font-black text-xs uppercase italic">Jump</span>
        </button>
      </div>
    </div>
  );
}
