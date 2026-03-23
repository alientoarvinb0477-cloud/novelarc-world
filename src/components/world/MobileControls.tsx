"use client";

import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  
  // Hard-coded position for the bottom-left corner
  const [basePos, setBasePos] = useState({ x: 120, y: 0 });
  const setMove = useStore((state) => state.setMove);
  
  const thumbRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const check = () => {
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        setIsPortrait(window.innerHeight > window.innerWidth);
        // Force center position based on actual screen height
        setBasePos({ x: 120, y: window.innerHeight - 120 });
      };
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);

  if (!isMobile) return null;

  // Portrait Lock Overlay
  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-10 border-2 border-orange-500 rounded-lg animate-bounce mb-4" />
        <h2 className="text-white font-bold uppercase text-[10px] tracking-widest">Rotate for Landscape</h2>
      </div>
    );
  }

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!thumbRef.current) return;
    const touch = e.touches[0];
    
    let dx = touch.clientX - basePos.x;
    let dy = touch.clientY - basePos.y;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = 50; // Keep this constant
    
    if (distance > maxRadius) {
      dx *= maxRadius / distance;
      dy *= maxRadius / distance;
    }

    thumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;

    const threshold = 15;
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
    // FORCE FULL SCREEN HEIGHT/WIDTH
    <div className="fixed top-0 left-0 w-screen h-screen z-[999] pointer-events-none select-none touch-none bg-transparent">
      
      {/* 1. LEFT SIDE - JOYSTICK INTERACTION AREA */}
      <div 
        className="absolute inset-y-0 left-0 w-1/2 pointer-events-auto bg-white/5 border-r border-white/5"
        onTouchMove={handleJoystickMove} 
        onTouchEnd={resetJoystick} 
      />

      {/* 2. RIGHT SIDE - LOOK INTERACTION AREA */}
      <div 
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-auto"
        onTouchStart={(e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchMove={handleLookMove} 
      />

      {/* 3. THE JOYSTICK BASE (FORCE 140px size) */}
      <div 
        style={{ 
          left: `${basePos.x}px`, 
          top: `${basePos.y}px`, 
          transform: 'translate(-50%, -50%)',
          width: '140px',
          height: '140px'
        }}
        className="absolute rounded-full bg-stone-900/80 border-2 border-orange-500/40 flex items-center justify-center pointer-events-none shadow-2xl"
      >
        {/* Inner Ring */}
        <div className="absolute inset-4 rounded-full border border-white/5" />
        
        {/* 4. THE JOYSTICK THUMB (FORCE 64px size) */}
        <div 
          ref={thumbRef} 
          style={{ width: '64px', height: '64px' }}
          className="rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-orange-300 shadow-xl flex items-center justify-center"
        >
          <div className="w-4 h-4 rounded-full bg-white/20" />
        </div>
      </div>

      {/* 5. THE JUMP BUTTON (FORCE 96px size) */}
      <div className="absolute bottom-12 right-12 pointer-events-auto">
        <button 
          onPointerDown={() => setMove("jump", true)} 
          onPointerUp={() => setMove("jump", false)}
          style={{ width: '96px', height: '96px' }}
          className="rounded-full bg-orange-600/30 border-2 border-orange-500 flex items-center justify-center active:scale-90 active:bg-orange-600 transition-all shadow-lg"
        >
          <span className="text-white font-black text-[10px] uppercase italic">Jump</span>
        </button>
      </div>

    </div>
  );
}
