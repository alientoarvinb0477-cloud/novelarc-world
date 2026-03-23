"use client";

import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const setMove = useStore((state) => state.setMove);
  
  const joystickRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  if (!isMobile) return null;

  // --- LOOK AROUND LOGIC (Right Side of Screen) ---
  const handleLookMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    // Check if touch is on the right half of the screen
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

  // --- JOYSTICK LOGIC (Bottom Left) ---
  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!joystickRef.current || !thumbRef.current) return;
    
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const touch = e.touches[0];
    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = rect.width / 2;
    
    if (distance > maxRadius) {
      dx *= maxRadius / distance;
      dy *= maxRadius / distance;
    }

    thumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;

    // Deadzone and direction mapping
    const threshold = 12; 
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
    <div className="fixed inset-0 z-[150] select-none pointer-events-none overflow-hidden">
      
      {/* RIGHT SIDE: Touch-to-Look Area */}
      <div 
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-auto active:cursor-grabbing"
        onTouchStart={(e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchMove={handleLookMove}
      />

      {/* --- JOYSTICK (Bottom Left) --- */}
      <div className="absolute bottom-12 left-12 pointer-events-auto">
        <div 
          ref={joystickRef}
          className="w-36 h-36 rounded-full bg-stone-900/40 border-2 border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl"
          onTouchMove={handleJoystickMove}
          onTouchEnd={resetJoystick}
        >
          {/* Inner Ring Decor */}
          <div className="absolute inset-4 rounded-full border border-white/5 pointer-none" />
          
          {/* Joystick Thumb (Knob) */}
          <div 
            ref={thumbRef}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_0_25px_rgba(234,88,12,0.5)] border-2 border-orange-300/30 transition-transform duration-75 flex items-center justify-center"
          >
             <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
          </div>
        </div>
      </div>

      {/* --- ACTION BUTTON (Bottom Right) --- */}
      <div className="absolute bottom-16 right-16 pointer-events-auto scale-110">
        <button 
          onPointerDown={() => setMove("jump", true)} 
          onPointerUp={() => setMove("jump", false)}
          className="w-20 h-20 rounded-full bg-orange-600/20 border-2 border-orange-500/50 flex items-center justify-center active:bg-orange-600 active:scale-90 transition-all shadow-[0_0_40px_rgba(234,88,12,0.2)]"
        >
          <span className="text-orange-500 font-bold text-[10px] uppercase tracking-tighter active:text-white">Jump</span>
        </button>
      </div>

    </div>
  );
}
